from fastapi import FastAPI
from sqlmodel import SQLModel

from routers import admin
from database import engine

import models

app = FastAPI(title='Vechicle Theft Alert Backend')

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(admin.router)

@app.get('/')
def home():
    return {'data': 'hello world from fastapi'}