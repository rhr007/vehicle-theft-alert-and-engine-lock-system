

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select

import schemas, models, hashing, JWT_Token
from database import get_db

router = APIRouter(tags=['Log In'], prefix='/users')

@router.post('/login')
def user_login(user_request: Annotated[OAuth2PasswordRequestForm, Depends()], db = Depends(get_db)):

    check_user = db.exec(select(models.User).where(models.User.email == user_request.username)).first()
    
    if check_user:
        check_password = hashing.verify_password(user_request.password, check_user.password)

        if check_password:
            token_data = {
                'email': check_user.email,
                'is_active': check_user.is_active,
                'is_admin': check_user.is_admin
            }
            access_token = JWT_Token.create_access_token(data=token_data)

            return schemas.Token(access_token=access_token, token_type="bearer", is_active=check_user.is_active, is_admin=check_user.is_admin)

    return  JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={'msg': "No User"}) 

@router.get("/me")
async def read_users_me(email = Depends(JWT_Token.get_current_user), db = Depends(get_db)):
    user_info = db.exec(select(models.User).where(models.User.email == email)).first()
    info = {
        'name' : user_info.email,
        'id' : user_info.id
    }
    return info
    