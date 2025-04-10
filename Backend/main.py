from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from routers import admin, login, contactus, motor, otp_actions
from database import engine

import models

app = FastAPI(title='Vechicle Theft Alert Backend')

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(admin.router)
app.include_router(login.router)
app.include_router(contactus.router)
app.include_router(motor.router)
app.include_router(otp_actions.router)
