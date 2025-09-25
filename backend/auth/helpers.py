import os
from datetime import datetime, timedelta, timezone
import random
import string

import jwt
from jwt.exceptions import InvalidTokenError
from dotenv import load_dotenv

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from auth.models import User
from spotify.helpers import get_cached_refresh_token

load_dotenv()
BACKEND_API_ENDPOINT = os.getenv("BACKEND_API_ENDPOINT")
SPOTIFY_ENDPOINT = "https://accounts.spotify.com"

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = f"{BACKEND_API_ENDPOINT}/auth/success"

ACCESS_TOKEN_EXPIRE_MINUTES = 120
ALGORITHM = os.getenv("ALGORITHM")
SECRET_KEY = os.getenv("SECRET_KEY")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Some util functions
def generate_random_string(length: int) -> str:
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))

def get_scopes() -> str:
    scopes = [
        "user-library-modify",
        "user-read-playback-position",
        "user-read-email",
        "user-library-read",
        "playlist-read-collaborative",
        "playlist-modify-private",
        "user-follow-read",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-private",
        "playlist-read-private",
        "user-top-read",
        "playlist-modify-public",
        "ugc-image-upload",
        "user-follow-modify",
        "user-modify-playback-state",
        "user-read-recently-played",
    ]
    return " ".join(scopes)


def create_jwt_token(data: dict):
    """
    Create a jwt token with {data}
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES) # setting a default expiration for all tokens
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:  
    # Expects token to be passed to the request header like ("Authorization": Bearer Token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        spotify_user_id = payload.get("sub")
        if spotify_user_id is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    
    refresh_token = get_cached_refresh_token(spotify_user_id)
    return User(spotify_user_id=spotify_user_id, refresh_token=refresh_token)
