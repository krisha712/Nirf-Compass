from fastapi import APIRouter, Depends, HTTPException
from models import HistoryItem, SaveHistoryRequest
from auth import get_current_user
from database import history_collection
from typing import List
from datetime import datetime, timezone
import uuid

router = APIRouter()


@router.post("/history", status_code=201)
async def save_history(body: SaveHistoryRequest, current_user: dict = Depends(get_current_user)):
    """Save a university search to MongoDB for the logged-in user."""
    if not body.university or not body.university.strip():
        raise HTTPException(status_code=400, detail="university is required")

    doc = {
        "id": str(uuid.uuid4()),
        "userId": current_user["sub"],
        "university_name": body.university.strip(),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "status": "Report Generated",
    }
    await history_collection.insert_one(doc)
    return {"message": "History saved", "id": doc["id"]}


@router.get("/history", response_model=List[HistoryItem])
async def get_history(current_user: dict = Depends(get_current_user)):
    """Return search history for the logged-in user, latest first."""
    user_id = current_user["sub"]
    cursor = history_collection.find(
        {"userId": user_id},
        {"_id": 0}  # exclude MongoDB _id
    ).sort("timestamp", -1)

    results = await cursor.to_list(length=100)
    return results
