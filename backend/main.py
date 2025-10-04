import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

import auth.routes as auth
import spotify.routes as spotify
import api.routes as api

load_dotenv()

FRONTEND_ENDPOINT = os.getenv("FRONTEND_ENDPOINT")


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(lifespan=lifespan)

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
