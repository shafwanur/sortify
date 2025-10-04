from pydantic import BaseModel


class AccessTokenRequest(BaseModel):
    spotify_user_id: str | None = None
    refresh_token: str
