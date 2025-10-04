from . import globalvars


def sort_songs(arg: str):
    """
    Sort globalvars.song_list according to the argument passed.

    Possible arguments:
        all-of: einfach der Reihenfolge der Veröffentlichung nach Songs in die Playlist reinhauen.
        album-sort: albums sorted by year (ascending), songs within the album sorted by popularity (descending).
        global-sort: sort every song by popularity by the artist (descending)

    At the end, there's a layer to delete duplicate songs. Here, the song which appeared in the earliest album stays.
    """

    # Types of Sorting available
    if arg == "album-sort":
        globalvars.song_list = sorted(
            globalvars.song_list,
            key=lambda x: (x["release_date"], x["album_name"], -x["popularity"]),
        )
    if arg == "global-sort":
        globalvars.song_list = sorted(
            globalvars.song_list, key=lambda x: -x["popularity"]
        )
    if arg == "all-of":
        globalvars.song_list = sorted(
            globalvars.song_list, key=lambda x: (x["release_date"], x["album_name"])
        )

    # Deleting Duplicates Layer
    tmp = globalvars.song_list.copy()
    tmp = sorted(
        tmp, key=lambda x: (x["track_name"], x["album_type"], x["release_date"])
    )  # Song belongs in album (IMPORTANT: NOT SINGLE), where it appears FIRST (earliest release date)
    song_album_mapping = dict()
    for p in tmp:
        if not p["track_name"] in song_album_mapping:
            song_album_mapping[p["track_name"]] = p["album_name"]

    # Keywords to sort by
    filter_keywords = [
        "live",
        "acoustic",
        "a cappella",
        "acapella",
        "instrumental",
        "karaoke",
        "live at",
        "studio version",
        "remix",
    ]
    contains_junk = lambda songname: any(k in songname.lower() for k in filter_keywords)
    without_dups = []  # songs without the duplicates & without live/instrumentals, etc
    for p in globalvars.song_list:
        songname, albumname = p["track_name"], p["album_name"]
        if song_album_mapping[songname] == albumname and not contains_junk(songname):
            without_dups.append(p)

    globalvars.song_list[:] = without_dups
