from sqlmodel import SQLModel, Field
from pydantic import EmailStr
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = 'users'
    id: int | None = Field(default=None, primary_key=True)
    first_name: str | None = Field(default=None)
    last_name: str | None = Field(default=None)
    email: EmailStr = Field(index=True, unique=True)
    password: str
    is_active: bool | None = Field(default=False)
    is_admin: bool | None  = Field(default=False)

class Message(SQLModel, table=True):
    __tablename__ = 'messages'

    id: int | None = Field(primary_key=True, index=True, default=None)
    name: str
    email: EmailStr
    message: str
    date_time: datetime


class Motor(SQLModel, table=True):
    __tablename__ = 'motors'

    id: int | None = Field(primary_key=True, index=True, default=None)

    user_id: int | None = Field(default= None, foreign_key='users.id')
    motor_status: bool | None = Field(default=False)

