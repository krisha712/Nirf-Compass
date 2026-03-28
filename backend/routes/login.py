from fastapi import APIRouter
from models import LoginRequest, LoginResponse
from auth import validate_credentials, create_token

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest):
    user  = validate_credentials(body.email, body.password)
    token = create_token(user["userId"], user["email"])
    return LoginResponse(token=token, userId=user["userId"], email=user["email"])
