import json
import requests 

from .tracks import push_album_tracks

def process_albums(artist_id: str, access_token: str):
    '''
    Process all albums of an artist and the album's tracks.
    '''
    
    url = f'https://api.spotify.com/v1/artists/{artist_id}/albums'
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    params = {
        'include_groups': "album,single",
        'limit': 50,
    }
    while True:
        response = requests.get(url = url, headers = headers, params = params)
        print(response)
        items = response.json()['items']
        for item in items:
            # yield from push_album_tracks(album_id = item['id'], access_token = access_token)
            push_album_tracks(album_id = item['id'], access_token = access_token)

            data = {"data": f"Processing album: {item['name']}"}
            yield f"{json.dumps(data)}\n"
            
            print(data) # album processed currently
    
        url = response.json()['next']
        if type(url) != str:
            break
