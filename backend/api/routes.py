import json
import requests
import asyncio

from fastapi import APIRouter, Header
from fastapi.responses import StreamingResponse
from fastapi.responses import StreamingResponse

from api.models import (
    ArtistSearchRequest,
    SortRequest
)

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
    return StreamingResponse(main(artist_name=payload.artist_name, artist_id=payload.artist_id, arg=payload.arg, spotify_user_id=payload.spotify_user_id, access_token=access_token), media_type="text/plain")

async def stream_generator():
    """
    A simple generator that yields JSON strings, each followed by a newline.
    """
    for i in range(10):
        message_data = {"count": i, "message": f"This is message {i}"}
        
        # 1. CRUCIAL: Yield the JSON string followed by a single newline.
        # This creates a newline-delimited JSON stream (NDJSON).
        yield f"{json.dumps(message_data)}\n"
        
        await asyncio.sleep(0.5) # Non-blocking delay

@router.post("/test")
async def test_stream():
    # 2. Use a simple media_type like 'text/plain' or 'application/x-ndjson'.
    return StreamingResponse(stream_generator(), media_type="text/plain")

@router.get("/startup")
def startup():
    return "Backend connected ✅"