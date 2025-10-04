import json
import requests
import asyncio

from fastapi import APIRouter, Header
from fastapi.responses import StreamingResponse
from fastapi.responses import StreamingResponse

from api.models import ArtistSearchRequest, SortRequest

from api.helpers.main import main

router = APIRouter(prefix="/api", tags=["api"])


@router.get("/artists")
def search_artist(artist_name: str, access_token: str = Header(...)):
    """
    Searches artist by name
    """
    url = f"https://api.spotify.com/v1/search"
    headers = {
        "Authorization": f"Bearer {access_token}",
    }
    params = {"q": artist_name, "type": "artist", "limit": 5}
    response = requests.get(url=url, headers=headers, params=params)
    return {
        "status_code": response.status_code,
        "msg": response.json(),  # TODO: images from here will be useful later on, returning entire json for now.
    }


@router.post("/sort")
def call_main(payload: SortRequest, access_token: str = Header(...)):
    return StreamingResponse(
        main(
            artist_name=payload.artist_name,
            artist_id=payload.artist_id,
            arg=payload.arg,
            spotify_user_id=payload.spotify_user_id,
            access_token=access_token,
        ),
        media_type="text/plain",
    )


@router.get("/startup")
def startup():
    return "Backend connected ✅"
