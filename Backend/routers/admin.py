
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlmodel import select


import schemas, models, hashing

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


@router.delete('/user')
def romove_user(user_email: schemas.UserEmailBase, db = Depends(get_db)):
    check_user = db.exec(select(models.User).where(models.User.email == user_email.email)).first()

    if check_user:
        db.delete(check_user)
        db.commit()

        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content={'msg' : 'User Removed'})
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={'msg' : 'No Such Email'})

