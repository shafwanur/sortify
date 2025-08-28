import os
import base64
import requests
from dotenv import load_dotenv

from datetime import datetime, timedelta, timezone
from spotify.models import AccessTokenRequest

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
BACKEND_ENDPOINT = os.getenv("BACKEND_ENDPOINT")
SPOTIFY_ENDPOINT = "https://accounts.spotify.com"
REDIRECT_URI = f"{BACKEND_ENDPOINT}/auth/success"



# --- Access Token Caching
access_token_cache = {}


def cache_access_token(spotify_user_id: int, access_token: str, expires_in: int = 3600):
    access_token_cache[spotify_user_id] = {
        "access_token": access_token,
        "expires_at": datetime.now(timezone.utc) + timedelta(seconds=expires_in),
    }


def get_cached_access_token(spotify_user_id: int) -> str | None:
    token_data = access_token_cache.get(spotify_user_id)
    if token_data and token_data["expires_at"] > datetime.now(timezone.utc):
        return token_data["access_token"]
    return None


def create_access_token(payload: AccessTokenRequest):
    url = f"{SPOTIFY_ENDPOINT}/api/token"
    data = {
        "grant_type": "refresh_token",
        "refresh_token": payload.refresh_token
    }
    cred = f"{CLIENT_ID}:{CLIENT_SECRET}"
    cred_b64 = base64.b64encode(cred.encode())
    headers = {"Authorization": f"Basic {cred_b64.decode()}"}
    response = requests.post(url=url, data=data, headers=headers)
    access_token = response.json().get("access_token")

    spotify_user_id = payload.spotify_user_id
    if spotify_user_id is None: 
        spotify_user_id = create_spotify_user_id(access_token=access_token)

    cache_access_token(spotify_user_id=spotify_user_id, access_token=access_token)
    return access_token

def create_spotify_user_id(access_token: str):
    url = f"https://api.spotify.com/v1/me"
    headers = {"Authorization": "Bearer " + access_token}
    response = requests.get(url, headers=headers)  # TODO: add some error handling
    spotify_user_id = response.json().get("id")
    return spotify_user_id

def create_refresh_token(auth_code: str):
    # Exchange auth_code immediately for refresh_token
    url = f"{SPOTIFY_ENDPOINT}/api/token"
    data = {
        "grant_type": "authorization_code",
        "code": auth_code,
        "redirect_uri": REDIRECT_URI,
    }
    cred = f"{CLIENT_ID}:{CLIENT_SECRET}"
    cred_b64 = base64.b64encode(cred.encode())
    headers = {"Authorization": f"Basic {cred_b64.decode()}"}
    response = requests.post(url=url, data=data, headers=headers)
    return response.json().get(
        "refresh_token"
    )  # TODO: returns None when it doesn't exist?