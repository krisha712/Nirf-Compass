from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# ── Config ────────────────────────────────────────────────────────────────────
SECRET_KEY = "nirf-compass-secret-key-change-in-production"
ALGORITHM  = "HS256"
TOKEN_EXPIRE_HOURS = 24

security = HTTPBearer()

# ── Dummy user store (replace with DB later) ──────────────────────────────────
DUMMY_USERS = {
    "admin@nirf.com":  {"userId": "user_001", "password": "admin123",  "email": "admin@nirf.com"},
    "test@nirf.com":   {"userId": "user_002", "password": "test123",   "email": "test@nirf.com"},
    "demo@nirf.com":   {"userId": "user_003", "password": "demo123",   "email": "demo@nirf.com"},
}

# ── Token helpers ─────────────────────────────────────────────────────────────
def create_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.utcnow() + timedelta(hours=TOKEN_EXPIRE_HOURS),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def validate_credentials(email: str, password: str) -> dict:
    """Returns user dict if credentials match, else raises 401."""
    user = DUMMY_USERS.get(email)
    if not user or user["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user


def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """Dependency – extracts and validates JWT from Authorization header."""
    return decode_token(credentials.credentials)
