from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from auth import create_token

router = APIRouter()

GOOGLE_CLIENT_ID = "660353201545-cbjcmg518qoas1o1nip9qr48due7dni9.apps.googleusercontent.com"


class GoogleTokenRequest(BaseModel):
    token: str


@router.post("/auth/google")
def google_auth(data: GoogleTokenRequest):
    try:
        idinfo = id_token.verify_oauth2_token(
            data.token,
            google_requests.Request(),
            GOOGLE_CLIENT_ID,
        )
    except ValueError as e:
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {str(e)}")

    email = idinfo.get("email")
    name  = idinfo.get("name", email)
    user_id = f"google_{idinfo.get('sub')}"

    access_token = create_token(user_id, email)

    return {
        "token": access_token,
        "userId": user_id,
        "email": email,
        "name": name,
    }
