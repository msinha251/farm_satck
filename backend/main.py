from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Todo
from database import (
    fetch_one_todo,
    fetch_all_todo,
    create_todo,
    update_todo,
    remove_todo,
)

app = FastAPI()

origins = ["https://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Root path
@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todo()
    return response


@app.get("/api/todo{title}" response_model=Todo)
async def get_todo_by_id(title: str):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Todo {title} doesn't exist")
    

@app.post("/api/todo", response_model=Todo)
async def post_todo(todo:Todo):
    response = await create_todo(todo.to_dict())
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Error occured")


@app.put("/api/todo{title}", response_model=Todo)
async def put_todo_by_id(title: str, description: str):
    response = await update_todo(title, description)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Tdo {title} doesn't exist")

@app.delete("/api/todo{title}")
async def delete_todo_by_id(title: str):
    response = await remove_todo(title)
    if response:
        return f"Successfully deleted the todo {title}"
    raise HTTPException(status_code=404, detail=f"Todo {title} doesn't exist")