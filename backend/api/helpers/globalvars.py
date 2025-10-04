def init():
    global song_list
    song_list = []


def yield_text(text: str):
    data = {"data": text}
    yield f"{json.dumps(data)}\n"
