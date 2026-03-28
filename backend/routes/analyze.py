from fastapi import APIRouter, HTTPException
from models import AnalyzeRequest, AnalyzeResponse, UniversityEntry, ScoreVector, GapInsight
import pandas as pd
import os

router = APIRouter()

_DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

nirf_df = pd.read_csv(os.path.join(_DATA_DIR, "nirf_data.csv"))
nirf_df.columns = [c.strip().lower() for c in nirf_df.columns]
for col in ["tlr", "rp", "go", "oi", "pr", "score", "rank"]:
    nirf_df[col] = pd.to_numeric(nirf_df[col], errors="coerce")

_all_raw = pd.read_csv(os.path.join(_DATA_DIR, "all_universities.csv"), encoding="cp1252", usecols=[0, 2, 3], header=0)
_all_raw.columns = ["university", "type", "state"]
_all_raw = _all_raw.dropna(subset=["university"])
_all_raw["university"] = _all_raw["university"].astype(str).str.strip()
_all_raw["type"]  = _all_raw["type"].astype(str).str.strip().fillna("Private")
_all_raw["state"] = _all_raw["state"].astype(str).str.strip().fillna("Unknown")

RECOMMENDATIONS = {
    "tlr": ["Recruit more PhD-qualified faculty", "Upgrade lab infrastructure", "Adopt modern digital teaching tools"],
    "rp":  ["Increase research publications", "Apply for sponsored research grants", "Build industry-academia partnerships"],
    "go":  ["Strengthen placement cell", "Launch structured internship programs", "Introduce career counseling"],
    "oi":  ["Expand scholarship programs", "Develop community outreach activities", "Improve campus accessibility"],
    "pr":  ["Enhance digital presence", "Organize national conferences", "Strengthen alumni engagement"],
}
LABELS = {
    "tlr": "Teaching, Learning & Resources",
    "rp":  "Research & Professional Practice",
    "go":  "Graduation Outcomes",
    "oi":  "Outreach & Inclusivity",
    "pr":  "Perception",
}
KEYS = ["tlr", "rp", "go", "oi", "pr"]
IMPROVEMENT_BASE = {"tlr": 45, "rp": 35, "go": 50, "oi": 55, "pr": 30}

def lookup_type_state(name):
    key = name.lower().strip()
    m = _all_raw[_all_raw["university"].str.lower() == key]
    if m.empty:
        m = _all_raw[_all_raw["university"].str.lower().str.contains(key, na=False)]
    if not m.empty:
        return m.iloc[0]["type"], m.iloc[0]["state"]
    return "Private", "Unknown"

def row_to_entry(row, uni_type="Private", uni_state="Unknown"):
    overall = round(row["tlr"]*0.3 + row["rp"]*0.3 + row["go"]*0.2 + row["oi"]*0.1 + row["pr"]*0.1, 2)
    return UniversityEntry(
        rank=int(row["rank"]), name=str(row["university"]),
        scores=ScoreVector(tlr=round(float(row["tlr"]),2), rp=round(float(row["rp"]),2),
            go=round(float(row["go"]),2), oi=round(float(row["oi"]),2),
            pr=round(float(row["pr"]),2), overall=overall),
        type=uni_type, state=uni_state,
    )

@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(body: AnalyzeRequest):
    name = body.university_name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="university_name is required")
    mask = nirf_df["university"].str.lower() == name.lower()
    matches = nirf_df[mask]
    if matches.empty:
        matches = nirf_df[nirf_df["university"].str.lower().str.contains(name.lower(), na=False)]
    if not matches.empty:
        row = matches.iloc[0]
        rank = int(row["rank"])
        t, s = lookup_type_state(str(row["university"]))
        above = nirf_df[nirf_df["rank"] < rank].sort_values("rank").head(5)
        if above.empty:
            above = nirf_df[nirf_df["rank"] != rank].sort_values("rank").head(5)
        peer_avgs = {k: round(float(above[k].mean()), 2) for k in KEYS}
        insights = []
        for k in KEYS:
            val = round(float(row[k]), 2)
            gap = round(peer_avgs[k] - val, 2)
            if gap > 0:
                insights.append(GapInsight(parameter=k, label=LABELS[k], selected_score=val,
                    peer_avg=peer_avgs[k], gap=gap, recommendations=RECOMMENDATIONS[k]))
        insights.sort(key=lambda x: x.gap, reverse=True)
        return AnalyzeResponse(
            selected_university=row_to_entry(row, t, s),
            top_universities=[row_to_entry(r, *lookup_type_state(str(r["university"]))) for _, r in above.iterrows()],
            comparison={k: {"selected": round(float(row[k]),2), "peer_avg": peer_avgs[k]} for k in KEYS},
            performance_insights=insights,
        )
    uni_type, uni_state = lookup_type_state(name)
    boost = {"Central": 10, "State": 5, "Deemed": 3, "Private": 0}.get(uni_type, 0)
    scores = {k: round(IMPROVEMENT_BASE[k] + boost, 2) for k in KEYS}
    overall = round(scores["tlr"]*0.3 + scores["rp"]*0.3 + scores["go"]*0.2 + scores["oi"]*0.1 + scores["pr"]*0.1, 2)
    peers = nirf_df.sort_values("rank", ascending=False).head(5)
    peer_avgs = {k: round(float(peers[k].mean()), 2) for k in KEYS}
    insights = []
    for k in KEYS:
        gap = round(peer_avgs[k] - scores[k], 2)
        if gap > 0:
            insights.append(GapInsight(parameter=k, label=LABELS[k], selected_score=scores[k],
                peer_avg=peer_avgs[k], gap=gap, recommendations=RECOMMENDATIONS[k]))
    insights.sort(key=lambda x: x.gap, reverse=True)
    return AnalyzeResponse(
        selected_university=UniversityEntry(rank=999, name=name,
            scores=ScoreVector(**scores, overall=overall), type=uni_type, state=uni_state),
        top_universities=[row_to_entry(r, *lookup_type_state(str(r["university"]))) for _, r in peers.iterrows()],
        comparison={k: {"selected": scores[k], "peer_avg": peer_avgs[k]} for k in KEYS},
        performance_insights=insights,
    )
