from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from sqlmodel import Session, select

from database import get_db
import otp, schemas, models, hashing
from SECRET_DATA import Email_Secrets

router = APIRouter(tags=["OTP-Actions"], prefix="/otp")

@router.get("/send/{email}")
def send(email, db = Depends(get_db)):
    check_user = db.exec(select(models.User).where(models.User.email == email)).first()

    if check_user:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content= {'msg': 'Already Registered'})
    
    otp_to_send = otp.get_otp(email)
    send_otp(email, otp_to_send)

@router.post("/verify")
def verify_otp(request_body: schemas.RegistrationBody, db: Session = Depends(get_db)):
    check = otp.verify_otp(request_body.email, request_body.otp)
    if not check:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"msg": "otp not matched"})
    
    user = db.exec(select(models.User).where(models.User.email == request_body.previous_email)).first()
    if not user:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"msg": "server error"})
    
    request_body.password = hashing.get_password_hash(request_body.password)
    user.is_active = True
    user.first_name = request_body.first_name
    user.last_name = request_body.last_name
    user.email = request_body.email
    user.password = request_body.password
    db.add(user)
    db.commit()
    
    return JSONResponse(status_code=status.HTTP_200_OK, content={"msg" : "account activation successful"})
    





def send_otp(receiver, otp_to_send):
    import smtplib
    sender = Email_Secrets.sender_email()
    subject = "OTP From Theft Alert System."
    message = f"Your OTP is {otp_to_send}, it will expire in 2 minutes.\nThank you,\nTeam Theft Alert System."

    text = f"Subject: {subject}\n\n{message}"

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login(sender, Email_Secrets.app_pass())

    server.sendmail(sender, receiver, text)
