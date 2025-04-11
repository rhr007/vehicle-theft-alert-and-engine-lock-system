
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlmodel import select


import schemas, models, hashing, JWT_Token

from database import get_db


router = APIRouter(prefix='/admin', tags=['Admin Pannel'])


@router.post('/user', status_code=status.HTTP_201_CREATED)
def add_new_user(userinfo: schemas.UserBase, db = Depends(get_db)):
    check_user = db.exec(select(models.User).where(models.User.email == userinfo.email)).first()

    if check_user:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content= {'msg': 'Already Registered'})
        
    userinfo.password = hashing.get_password_hash(userinfo.password)
    
    new_user = models.User.model_validate(userinfo)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_user_id = new_user.id

    motor = models.Motor(user_id= new_user_id, motor_status=False)
    db.add(motor)
    db.commit()

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={'msg': 'Created'})


@router.get('/users')
def all_users(email = Depends(JWT_Token.is_admin), db = Depends(get_db)):
    users = db.exec(select(models.User).where(models.User.email != email)).all()
    return users


@router.delete('/user/{id}')
def romove_user(id, db = Depends(get_db)):
    check_user = db.exec(select(models.User).where(models.User.id == id)).first()

    if check_user:
        db.delete(check_user)
        db.commit()

        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content={'msg' : 'User Removed'})
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={'msg' : 'No Such Email'})

