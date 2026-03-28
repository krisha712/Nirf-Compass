from pydantic import BaseModel, EmailStr
from typing import Optional, List

# ── Auth ──────────────────────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    token: str
    userId: str
    email: str

# ── Analysis ──────────────────────────────────────────────────────────────────
class AnalyzeRequest(BaseModel):
    university_name: str

class ScoreVector(BaseModel):
    tlr: float
    rp: float
    go: float
    oi: float
    pr: float
    overall: float

class UniversityEntry(BaseModel):
    rank: int
    name: str
    scores: ScoreVector
    type: str = "Private"
    state: str = "Unknown"

class GapInsight(BaseModel):
    parameter: str
    label: str
    selected_score: float
    peer_avg: float
    gap: float
    recommendations: List[str]

class AnalyzeResponse(BaseModel):
    selected_university: UniversityEntry
    top_universities: List[UniversityEntry]
    comparison: dict
    performance_insights: List[GapInsight]

# ── History ───────────────────────────────────────────────────────────────────
class HistoryItem(BaseModel):
    id: str
    university_name: str
    timestamp: str
    status: str

class SaveHistoryRequest(BaseModel):
    university: str
