from playlists import create_playlist
from albums import process_albums

song_list = []

def main(artist_name: str, artist_id: str, arg: str, spotify_user_id: str, access_token: str):
    '''
    Main function that gets called.
    Processes an artist's albums, creates a playlist, and add all songs to it after sorting. 
    '''

    # Reinitialise song_list at start
    song_list = []

    # Create the playlist, get its id
    playlist_id = create_playlist(artist_name)

    # Process all albums of the artist
    process_albums(artist_id)

    print(f"Total Song Count: {len(song_list)} \nSorted Songs: ") 

    # Sort song_list
    sort_songs(arg=arg)

    # Printing and storing some stats
    uris = [] # extracting just the uris in this step to later use to push into the newly created playlist
    file_name = os.path.join("../stats", f"{artist_name}.txt")
    with open(file_name, 'a', encoding='utf-8') as file:
        for song in song_list:
            uris.append(song["uri"])
            print(song)
            file.write(f"{song}\n")
    
    # Actual pushing the songs into the newly created playlist
    # TODO: should probably be a function on its own
    block_size = 100
    i = 0
    while i <= len(song_list):
        add_track_to_playlist(playlist_id, uris[i:i+block_size])
        i += block_size
    
    # Success
    print(f"Success: All {len(song_list)} songs added to playlist {playlist_id}")

# manual call: 
main("Berq", "0eVixEZVW2PB1UogwTWXc1", "all-of", "31ucvye6x6y7dojbxrokbxf25pwy", )