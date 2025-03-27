
from fastapi import APIRouter

import schemas


router = APIRouter(prefix='/admin', tags=['Admin Pannel'])

@router.post('/user')
def add_new_user(userinfo: schemas.UserBase):
    return userinfo