import os
import json

from .playlists import create_playlist, add_track_to_playlist
from .albums import process_albums
from .sort import sort_songs
from globalvars import yield_text
from . import globalvars


def main(
    artist_name: str, artist_id: str, arg: str, spotify_user_id: str, access_token: str
):
    """
    Main function that gets called.
    Processes an artist's albums, creates a playlist, and add all songs to it after sorting.
    """

    # Reinitialise globalvars.song_list at start
    globalvars.song_list = []

    # Create the playlist
    playlist_id = create_playlist(
        spotify_user_id=spotify_user_id,
        playlist_name=f"{arg} {artist_name}",
        access_token=access_token,
    )

    yield_text(f"Playlist with name {arg} {artist_name} created!")

    # Process all albums of the artist
    yield from process_albums(artist_id=artist_id, access_token=access_token)

    yield_text(
        f"Total Song Count of {artist_name}: {len(globalvars.song_list)}\nSorted Songs: "
    )

    # Sort globalvars.song_list
    sort_songs(arg=arg)

    # Printing and storing some stats
    uris = []  # extracting just the uris in this step to later use to push into the newly created playlist
    # file_name = os.path.join("../stats", f"{artist_name}.txt")
    # with open(file_name, 'a', encoding='utf-8') as file:
    for song in globalvars.song_list:
        uris.append(song["uri"])
        print(song)
        yield_text(f"{song['track_name'], song['popularity']}")

        # file.write(f"{song}\n")

    # At this point, we have the array of songs.
    # Theoretically, for another api call, we can send the raw data as is,
    #   and as Tom suggested, push them to the playlist only when the user asks for it.

    # Actual pushing the songs into the newly created playlist
    # TODO: should probably be a function on its own
    block_size = 100
    i = 0
    while i <= len(globalvars.song_list):
        add_track_to_playlist(
            playlist_id=playlist_id,
            uris=uris[i : i + block_size],
            access_token=access_token,
        )
        i += block_size

    # Success
    yield_text(
        f"🎉 Success! {len(globalvars.song_list)} unique songs added to the playlist {arg} {artist_name}"
    )
