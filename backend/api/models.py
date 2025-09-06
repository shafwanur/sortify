from pydantic import BaseModel


class PlaylistCreationRequest(BaseModel):
    spotify_user_id: str
    playlist_name: str


class PopulatePlaylistRequest(BaseModel):
    playlist_id: str
    uris: list


class RemoveTracksRequest(BaseModel):
    playlist_id: str
    uris: list


class ArtistSearchRequest(BaseModel):
    artist_name: str


class SortRequest(BaseModel):
    arg: str 
    artist_id: str 
    artist_name: str 
    spotify_user_id: str