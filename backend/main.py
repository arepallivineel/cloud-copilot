from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import time
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

clients = set()

@app.websocket("/ws/deploy")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.add(websocket)
    try:
        while True:
            data = {
                "id": str(uuid.uuid4()),
                "service": "auth-service",
                "environment": "prod",
                "status": "healthy",
                "health_checks": {"pre": "healthy", "post": "healthy"},
                "timestamp": int(time.time()),
            }
            await websocket.send_text(json.dumps(data))
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        clients.remove(websocket)
