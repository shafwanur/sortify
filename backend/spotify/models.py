from pydantic import BaseModel


class AccessTokenRequest(BaseModel):
    spotify_user_id: str | None = (
        None  # none means we don't know the spotify_user_id yet
    )
    refresh_token: str
