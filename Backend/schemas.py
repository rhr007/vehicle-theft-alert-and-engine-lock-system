from pydantic import EmailStr, BaseModel
from sqlmodel import SQLModel

from datetime import datetime

class UserBase(SQLModel):
    email: EmailStr
    password: str

class UserEmailBase(SQLModel):
    email: EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str
    is_active: bool
    is_admin: bool


class ContactBase(BaseModel):
    name: str
    email: EmailStr
    message: str

class RegistrationBody(BaseModel):
    otp: str
    first_name: str
    last_name: str
    email: str
    password: str
    previous_email: str