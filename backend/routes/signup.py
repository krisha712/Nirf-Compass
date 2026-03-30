from fastapi import APIRouter
from pydantic import BaseModel
from auth import register_user, create_token

router = APIRouter()


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


@router.post("/signup")
def signup(body: SignupRequest):
    user = register_user(body.email.strip(), body.password, body.name.strip())
    token = create_token(user["userId"], user["email"])
    return {"token": token, "userId": user["userId"], "email": user["email"], "name": user["name"]}
