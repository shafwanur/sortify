import json
import requests

from .tracks import push_album_tracks
from .globalvars import yield_text


def process_albums(artist_id: str, access_token: str):
    """
    Process all albums of an artist and the album's tracks.
    """

    url = f"https://api.spotify.com/v1/artists/{artist_id}/albums"
    headers = {
        "Authorization": f"Bearer {access_token}",
    }
    params = {
        "include_groups": "album,single",
        "limit": 50,
    }
    
    yield from yield_text("Starting to process albums ...")

    while True:
        response = requests.get(url=url, headers=headers, params=params)
        items = response.json()["items"]
        for item in items:
            push_album_tracks(album_id=item["id"], access_token=access_token)

            yield from yield_text(type="img", text=f"{item['name']}", img=item["images"][0], score=item["total_tracks"])

        url = response.json()["next"]
        if type(url) != str:
            break
