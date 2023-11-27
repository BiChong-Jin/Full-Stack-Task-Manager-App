from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Todo


app = FastAPI()

from database import (fetch_one_todo, fetch_all_todos, create_todo, update_todo, remove_todo)

# set origin for frontend
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/')
def read_root():
    return {"ping":"pong"}

@app.get('/api/todo')
async def get_todo():
    response = await fetch_all_todos()
    return response

@app.get('/api/todo/{title}', response_model=Todo)
async def get_todo_by_id(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"There is no todo item with {title}")

@app.post('/api/todo/', response_model=Todo)
async def post_todo(todo:Todo):
    # The methods .dict in BaseModel is deprecated, the alternative methods is 'model_dump'.
    response = await create_todo(todo.model_dump())
    if response:
        return response 
    
    raise HTTPException(400, "Something went wrong due to bad requests.")

@app.put('/api/todo/{title}/', response_model=Todo)
async def put_todo(title:str, description:str):
    response = await update_todo(title, description)
    if response:
        return response
    
    raise HTTPException(404, f"There is no todo item with {title}")

@app.delete('/api/todo/{title}')
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return f"Succesfully deleted {title} item."
    raise HTTPException(404, f"There is no todo item with {title}")
