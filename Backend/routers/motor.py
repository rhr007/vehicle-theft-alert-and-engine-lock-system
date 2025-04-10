
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlmodel import select
import models, JWT_Token
from database import get_db

router = APIRouter(prefix='/motor', tags=['Motor Part'])

@router.get('/on')
def turn_on(email = Depends(JWT_Token.get_current_user), db = Depends(get_db)):
    user_info = db.exec(select(models.User).where(models.User.email == email)).first()
    user_id = user_info.id

    motorstatus = db.exec(select(models.Motor).where(models.Motor.user_id == user_id)).first()

    motorstatus.motor_status = True
    db.add(motorstatus)
    db.commit()

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={'msg': 'motor on'})

@router.get('/off')
def turn_off(email = Depends(JWT_Token.get_current_user), db = Depends(get_db)):
    user_info = db.exec(select(models.User).where(models.User.email == email)).first()
    user_id = user_info.id

    motorstatus = db.exec(select(models.Motor).where(models.Motor.user_id == user_id)).first()

    motorstatus.motor_status = False
    db.add(motorstatus)
    db.commit()

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={'msg': 'motor off'})

@router.get('/status/{id}')
def check_current_status(id, db = Depends(get_db)):
    motor_info = db.exec(select(models.Motor).where(models.Motor.user_id == id)).first()

    return motor_info