
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from datetime import datetime
from sqlmodel import select

import schemas, models
from database import get_db

router = APIRouter(tags=['Contact Us'], prefix='/contact')


@router.post("")
def contact_to_admin(req_body: schemas.ContactBase, db = Depends(get_db)):
    req_body = dict(req_body)
    req_body['date_time'] = datetime.now()

    new_message = models.Message.model_validate(req_body)

    db.add(new_message)
    db.commit()

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={'msg': 'new message saved'})


@router.get('/messages')
def all_messages(db = Depends(get_db)):
    messages = db.exec(select(models.Message)).all()

    return messages

@router.delete('/message/{id}')
def delete_message(id, db = Depends(get_db)):
    message = db.exec(select(models.Message).where(models.Message.id == id)).first()

    db.delete(message)
    db.commit()

    return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content={'msg': 'deleted'})