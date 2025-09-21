import requests
import json

from . import globalvars

def track_info(track_id: str, access_token: str):
    '''
    Return a single track's popularity, album name, release date, track name, and URI.

    Args: 
    track_id (str): the track_id of the track whose information should be extracted. 
    '''
    
    url = f'https://api.spotify.com/v1/tracks/{track_id}'
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    response = requests.get(url = url, headers = headers)
    if response.status_code == 200:
        response = response.json()
        return { # is this sorted by lenght? yes, shut up. I might have ADHD or just severe brain damage.  
            "uri": response['uri'],
            "track_name": response['name'],
            "popularity": response['popularity'],
            "album_name": response['album']['name'],
            "album_type": response['album']['album_type'],
            "release_date": response['album']['release_date']
        }

def push_album_tracks(album_id: str, access_token: str):
    '''
    Push all tracks in an album to the globalvars.song_list list.
    '''
    
    url = f'https://api.spotify.com/v1/albums/{album_id}/tracks'
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    params = {
        'limit': 50,
    }
    response = requests.get(url = url, headers = headers, params = params)
    for item in response.json()['items']:
        p = track_info(track_id = item['id'], access_token=access_token)
        data = {"data": f"Processing track: {p['track_name']}"}
        print(data)
        # yield f"{json.dumps(data)}\n"
        globalvars.song_list.append(p) # TODO
