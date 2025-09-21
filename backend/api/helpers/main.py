import os
from .playlists import create_playlist, add_track_to_playlist
from .albums import process_albums
from .sort import sort_songs
from . import globalvars

import json 

def main(artist_name: str, artist_id: str, arg: str, spotify_user_id: str, access_token: str):
    '''
    Main function that gets called.
    Processes an artist's albums, creates a playlist, and add all songs to it after sorting. 
    '''

    # Reinitialise globalvars.song_list at start
    globalvars.song_list = []

    # Create the playlist
    playlist_id = create_playlist(spotify_user_id=spotify_user_id, playlist_name=f"{arg} {artist_name}", access_token=access_token)

    data = {"data": f"Playlist with id {playlist_id} created. Check your Spotify app ;)"}
    yield f"{json.dumps(data)}\n"

    # Process all albums of the artist
    yield from process_albums(artist_id=artist_id, access_token=access_token)

    data = {"data": f"Total Song Count: {len(globalvars.song_list)} \nSorted Songs: "}
    yield f"{json.dumps(data)}\n"
    
    # Sort globalvars.song_list
    sort_songs(arg=arg)

    # Printing and storing some stats
    uris = [] # extracting just the uris in this step to later use to push into the newly created playlist
    # file_name = os.path.join("../stats", f"{artist_name}.txt")
    # with open(file_name, 'a', encoding='utf-8') as file:
    for song in globalvars.song_list:
        uris.append(song["uri"])
        print(song)
        # file.write(f"{song}\n")
    
    # Actual pushing the songs into the newly created playlist
    # TODO: should probably be a function on its own
    block_size = 100
    i = 0
    while i <= len(globalvars.song_list):
        add_track_to_playlist(playlist_id=playlist_id, uris=uris[i:i+block_size],access_token=access_token)
        i += block_size
    
    # Success
    data = {"data": f"Success! {len(globalvars.song_list)} unique songs added to the playlist with id {playlist_id}"}

    yield f"{json.dumps(data)}\n"
# # manual call: 
# access_token = "BQBE5SGDBFLosDMyZwv80EodLOH7DyGpIx7kVzz0iJaK2Wjjs2Q16DO0JZsayChjs2Coxm0tmTXhNHoDYYCmGWujLdu4DiRotQW3I5ZSEpmzDidVLETpwYb4Uq63gvxXrKoRdl5y7vHLNnsTLknvTJ9AbnV2EUwA2gieuwiM-mLa0bpiTVaDc8fvG5wY_SQx1H1DvQ85oTswA2htwgQnO4jD_AdHZLJbPnROpn1EJaWTFTECCrOCa3Bm9vACwZAXjRaam4Bae-A7ySUp0pp4b5CKYyRFHP4S0NsKy6cUMnWaYD4JKxJCfLaEF_gdLnkktdxAdTq3AlInOuojLskjtGcjjMmiNZ9jrrgRwCM1ZZo90xf0ncAazT1_J-o"
# main("Berq", "0eVixEZVW2PB1UogwTWXc1", "all-of", "31ucvye6x6y7dojbxrokbxf25pwy", access_token)