import json 

def init():
    global song_list
    song_list = []


def yield_text(text: str, img: str = None, type: str = "text", score: int = None, album: str = None):
    data = {
        "type": type,
        "text": text,
        "img": img,
        "score": score,
        "album": album
    }
    yield f"{json.dumps(data)}\n"
