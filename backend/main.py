import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from db.init import init_db

import auth.routes as auth
import spotify.routes as spotify
import api.routes as api


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(lifespan=lifespan)

load_dotenv()

FRONTEND_ENDPOINT = os.getenv("FRONTEND_ENDPOINT")
origins = [
    f"{FRONTEND_ENDPOINT}",  # Vite dev server
    "http://127.0.0.1:5173",  # sometimes vite uses 127.0.0.1
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(spotify.router)
app.include_router(api.router)
