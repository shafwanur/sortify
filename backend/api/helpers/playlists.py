import json 
import requests

def create_playlist(spotify_user_id: str, playlist_name: str, access_token: str):
    """
    Create a new playlist with a given name".
    """
    url = f"https://api.spotify.com/v1/users/{spotify_user_id}/playlists"
    data = json.dumps(
        {
            "name": playlist_name,
            "public": True,
            "description": "Created by https://github.com/shafwanur/sortify",
        }
    )
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    response = requests.post(url=url, data=data, headers=headers)

    playlist_id = response.json().get("id")

    return playlist_id

def add_track_to_playlist(playlist_id: str, uris: list, access_token: str):
    '''
    Add tracks (uris) to the specified playlist of playlist_id.
    '''

    url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    data = json.dumps({
        'uris': uris
    })
    response = requests.post(url = url, headers = headers, data = data)
    if response.status_code == 200:
        print("Success: tracks added to playlist")

# NOTE: this follows a more RESTFUL API standard. Might be of relevance later, keeping therefore. 
# def populate_playlist(payload: PopulatePlaylistRequest, access_token: str = Header(...)):
#     """
#     Populate tracks to the specified playlist with playlist_id.
#     """
#     url = f"https://api.spotify.com/v1/playlists/{payload.playlist_id}/tracks"
#     headers = {
#         "Authorization": f"Bearer {access_token}",
#         "Content-Type": "application/json",
#     }
#     data = json.dumps({"uris": payload.uris})
#     response = requests.post(url=url, headers=headers, data=data)
#     return {
#         "message": "Successfully populated playlist!",
#         "status_code": response.status_code
#     }