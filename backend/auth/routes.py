import os
from urllib.parse import urlencode
from dotenv import load_dotenv

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi import Depends

from db.init import get_session
from auth.models import Token, User
from auth.helpers import (
    get_scopes,
    generate_random_string, 
    get_current_user,
    create_jwt_token,
    db_update,
)

from spotify.models import (
    AccessTokenRequest
)

from spotify.helpers import (
    create_spotify_user_id,
    create_refresh_token,
    create_access_token
)


load_dotenv()
FRONTEND_ENDPOINT = os.getenv("FRONTEND_ENDPOINT")
BACKEND_API_ENDPOINT = os.getenv("BACKEND_API_ENDPOINT")
SPOTIFY_ENDPOINT = "https://accounts.spotify.com"

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = f"{BACKEND_API_ENDPOINT}/auth/success"

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/login") 
async def spotify_login():
    """Go through spotify's login process, get user_id, tokenize, return token. """
    state = generate_random_string(16)
    scope = get_scopes()
    query_params = {
        "response_type": "code",
        "client_id": CLIENT_ID,
        "scope": scope,
        "redirect_uri": REDIRECT_URI,
        "state": state,
    }
    auth_url = f"{SPOTIFY_ENDPOINT}/authorize?" + urlencode(query_params)
    return RedirectResponse(auth_url)


@router.get("/success")
async def auth_callback(request: Request) -> Token:
    auth_code = request.query_params.get("code")

    if not auth_code:
        return JSONResponse({"error": "No auth_code returned"}, status_code=400)

    refresh_token = create_refresh_token(auth_code=auth_code)
    access_token = create_access_token(payload=AccessTokenRequest(refresh_token=refresh_token))
    spotify_user_id = create_spotify_user_id(access_token=access_token)

    # Update spotify_user_id and refresh_token in the database.
    await db_update(spotify_user_id, refresh_token)

    # send over the spotify_user_id as a jwt token. access_token and refresh_tokens shall be retrieved from a different api call later. 
    jwt_token = create_jwt_token(
        data={"sub": spotify_user_id}
    )

    # Send user back to frontend with token in query string
    frontend_url = f"{FRONTEND_ENDPOINT}/auth/callback?jwt_token={jwt_token}"
    return RedirectResponse(frontend_url)

    # idealerweise this should run, but temporary fix: sending the token as a param to the frontend. 
    # TODO: replace with HTTP Cookie for post/prod version.
    # return Token(jwt_token=jwt_token, token_type="bearer")

@router.get("/validate")
async def read_users_me(current_user: User = Depends(get_current_user)) -> User:
    '''For a token passed through the request body (Authorization Bearer), validate it.'''
    return current_user
