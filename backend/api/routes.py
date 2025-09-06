import json
import requests

from fastapi import APIRouter, Header

from api.models import (
    ArtistSearchRequest,
)

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

