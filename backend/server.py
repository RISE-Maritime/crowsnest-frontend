import sys

from typing import List

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

import uvicorn

app = FastAPI()

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>React+FastAPI app</title>
    </head>
    <body>
        <h1>React + FastAPI</h1>
        <h2>If you see this, you are in development mode and the react app is served at http://localhost:3000</h2>
    </body>
</html>
"""

vessel_targets = [
    {
        "latitude": 57.68477776430862,
        "longitude": 11.846957404275882,
        "length": 100,
        "beam": 20,
        "heading": 130,
        "lcg": 50,
    }
]


async def parse_message(websocket, message):
    if message["type"] == "heading":
        await websocket.send_json(message)
        modified_vessel_targets = [
            {**vt, "heading": float(message["data"]["value"])} for vt in vessel_targets
        ]
        print(modified_vessel_targets)
        await websocket.send_json(
            {"type": "vessel_targets", "data": modified_vessel_targets}
        )
    else:
        await websocket.send_json(message)


@app.get("/")
async def get():
    return HTMLResponse(html)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        await websocket.send_json({"type": "vessel_targets", "data": vessel_targets})
        while True:
            message = await websocket.receive_json()
            print(f"Received JSON {message}")
            await parse_message(websocket, message)

    except WebSocketDisconnect:
        print("User disconnected.")


if __name__ == "__main__":

    uvicorn.run("server:app", host="127.0.0.1", port=9999, reload=True)
