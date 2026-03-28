from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from routes.analyze import nirf_df, KEYS, LABELS, IMPROVEMENT_BASE, lookup_type_state
import io

router = APIRouter()

# ── Point-wise action lists per parameter ────────────────────────────────────
POINTS = {
    "tlr": {
        "critical": [
            "Immediately recruit PhD-qualified faculty to meet UGC norms",
            "Replace outdated lab equipment and upgrade library resources",
            "Launch emergency faculty development and training programs",
            "Introduce digital classrooms and e-learning infrastructure",
            "Audit curriculum and align with outcome-based education standards",
        ],
        "moderate": [
            "Increase faculty-to-student ratio by hiring domain specialists",
            "Modernize laboratories with industry-standard instruments",
            "Introduce outcome-based education (OBE) curriculum framework",
            "Provide faculty with research and conference travel grants",
            "Establish a dedicated teaching innovation and quality center",
        ],
        "longterm": [
            "Pursue NAAC A++ or NBA accreditation for all programs",
            "Establish Centers of Excellence with industry co-funding",
            "Launch interdisciplinary and dual-degree programs",
            "Build global faculty exchange partnerships",
            "Implement AI-driven personalized learning platforms",
        ],
    },
    "rp": {
        "critical": [
            "Set mandatory publication targets for all faculty members",
            "Create a seed research fund for junior faculty projects",
            "Register for Scopus and Web of Science indexing immediately",
            "Establish an IP and patent cell to accelerate filings",
            "Hire dedicated research coordinators for grant applications",
        ],
        "moderate": [
            "Apply for DST, DBT, and SERB government research grants",
            "Launch a research incubation center for student projects",
            "Organize inter-departmental research collaboration programs",
            "Incentivize faculty with research allowances and awards",
            "Build structured industry-academia joint research partnerships",
        ],
        "longterm": [
            "Target publications in Nature, Science, and Q1 Scopus journals",
            "Establish a technology transfer office for commercialization",
            "Create innovation hubs and startup accelerator programs",
            "Apply for international research grants (EU Horizon, NSF)",
            "Host national and international research conferences annually",
        ],
    },
    "go": {
        "critical": [
            "Revamp the placement cell with dedicated industry relations staff",
            "Introduce mandatory internship programs for all students",
            "Launch skill-based certifications aligned with industry demands",
            "Conduct weekly mock interviews and aptitude training sessions",
            "Partner with at least 20 companies for campus recruitment",
        ],
        "moderate": [
            "Establish alumni mentorship programs for current students",
            "Introduce entrepreneurship development and startup support",
            "Tie up with NSDC for skill development certifications",
            "Track and publish graduate employment outcomes annually",
            "Launch higher education guidance and GATE/GRE coaching",
        ],
        "longterm": [
            "Achieve 90%+ placement rate with top-tier companies",
            "Launch international placement drives and global tie-ups",
            "Establish a dedicated entrepreneurship and innovation fund",
            "Create a graduate tracking system for 5-year career outcomes",
            "Partner with IITs/IIMs for joint placement and networking",
        ],
    },
    "oi": {
        "critical": [
            "Launch full-fee scholarships for SC/ST/OBC students immediately",
            "Ensure 30% female enrollment across all programs",
            "Establish a dedicated accessibility cell for differently-abled students",
            "Conduct outreach programs in rural and tribal areas",
            "Introduce bridge courses for students from weaker backgrounds",
        ],
        "moderate": [
            "Expand scholarship programs to economically weaker sections",
            "Launch community development projects in nearby villages",
            "Introduce online/distance learning programs for wider reach",
            "Organize free skill workshops for local communities",
            "Improve campus infrastructure for differently-abled students",
        ],
        "longterm": [
            "Achieve gender parity across all departments and programs",
            "Launch a social responsibility fund for community projects",
            "Establish satellite campuses in underserved regions",
            "Partner with NGOs for education outreach initiatives",
            "Create a formal diversity and inclusion policy framework",
        ],
    },
    "pr": {
        "critical": [
            "Redesign the university website with modern UX and SEO",
            "Create active social media presence on LinkedIn, Twitter, YouTube",
            "Issue press releases for every major achievement or event",
            "Engage alumni to share success stories publicly",
            "Apply for national rankings and awards to gain visibility",
        ],
        "moderate": [
            "Publish a monthly newsletter for stakeholders and alumni",
            "Organize open days, hackathons, and public lectures",
            "Build a strong alumni network with regular engagement events",
            "Collaborate with media for research and innovation coverage",
            "Participate in national education fairs and exhibitions",
        ],
        "longterm": [
            "Target top-50 positions in QS India and NIRF rankings",
            "Launch international branding campaigns for global visibility",
            "Establish a dedicated PR and communications department",
            "Host TEDx, national summits, and thought leadership events",
            "Build strategic partnerships with industry leaders for co-branding",
        ],
    },
}


class RoadmapRequest(BaseModel):
    university: str


def get_scores(name: str):
    mask = nirf_df["university"].str.lower() == name.lower()
    m = nirf_df[mask]
    if m.empty:
        m = nirf_df[nirf_df["university"].str.lower().str.contains(name.lower(), na=False)]
    if not m.empty:
        row = m.iloc[0]
        return {k: round(float(row[k]), 2) for k in KEYS}, str(row["university"]), int(row["rank"])
    uni_type, _ = lookup_type_state(name)
    boost = {"Central": 10, "State": 5, "Deemed": 3, "Private": 0}.get(uni_type, 0)
    return {k: round(IMPROVEMENT_BASE[k] + boost, 2) for k in KEYS}, name, 999


def classify_gap(gap: float) -> str:
    if gap > 40:   return "critical"
    if gap >= 25:  return "moderate"
    return "longterm"


def build_roadmap(name: str):
    scores, canonical_name, rank = get_scores(name)

    top10 = nirf_df.sort_values("rank").head(10)
    top10_avg = {k: round(float(top10[k].mean()), 2) for k in KEYS}
    gaps = {k: round(top10_avg[k] - scores[k], 2) for k in KEYS}

    # Classify each parameter into a phase
    phase1_items, phase2_items, phase3_items = [], [], []
    for k in KEYS:
        gap = gaps[k]
        if gap <= 0:
            continue  # already above top-10 avg
        level = classify_gap(gap)
        entry = {
            "parameter": k,
            "label": LABELS[k],
            "score": scores[k],
            "top10_avg": top10_avg[k],
            "gap": gap,
            "points": POINTS[k][level],
        }
        if level == "critical":   phase1_items.append(entry)
        elif level == "moderate": phase2_items.append(entry)
        else:                     phase3_items.append(entry)

    # Sort each phase by gap descending
    for lst in [phase1_items, phase2_items, phase3_items]:
        lst.sort(key=lambda x: x["gap"], reverse=True)

    return {
        "university": canonical_name,
        "rank": rank,
        "scores": scores,
        "top10_avg": top10_avg,
        "gaps": gaps,
        "phases": {
            "phase1": {
                "title": "Phase 1: Immediate Actions",
                "duration": "0–6 months",
                "focus": "Critical Gap Resolution",
                "items": phase1_items,
            },
            "phase2": {
                "title": "Phase 2: Mid-Term Actions",
                "duration": "6–18 months",
                "focus": "Systematic Enhancement",
                "items": phase2_items,
            },
            "phase3": {
                "title": "Phase 3: Long-Term Growth",
                "duration": "18+ months",
                "focus": "Excellence & Leadership",
                "items": phase3_items,
            },
        },
    }


@router.post("/roadmap")
def get_roadmap(body: RoadmapRequest):
    name = body.university.strip()
    if not name:
        raise HTTPException(status_code=400, detail="university is required")
    return build_roadmap(name)


@router.post("/roadmap/pdf")
def get_roadmap_pdf(body: RoadmapRequest):
    name = body.university.strip()
    if not name:
        raise HTTPException(status_code=400, detail="university is required")

    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib import colors
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import cm
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
    except ImportError:
        raise HTTPException(status_code=500, detail="reportlab not installed. Run: pip install reportlab")

    data = build_roadmap(name)
    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4, leftMargin=2*cm, rightMargin=2*cm, topMargin=2*cm, bottomMargin=2*cm)
    styles = getSampleStyleSheet()

    title_style   = ParagraphStyle("T", parent=styles["Title"],   fontSize=20, textColor=colors.HexColor("#1e3a8a"), spaceAfter=4)
    heading_style = ParagraphStyle("H", parent=styles["Heading2"], fontSize=13, textColor=colors.HexColor("#1e3a8a"), spaceBefore=12, spaceAfter=4)
    phase_colors  = {"phase1": "#dc2626", "phase2": "#d97706", "phase3": "#16a34a"}

    story = []
    story.append(Paragraph("NIRF Improvement Roadmap", title_style))
    story.append(Paragraph(f"<b>{data['university']}</b>  ·  Rank #{data['rank']}", styles["Normal"]))
    story.append(Spacer(1, 0.3*cm))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#1e3a8a")))
    story.append(Spacer(1, 0.4*cm))

    # Score table
    story.append(Paragraph("Performance Gaps vs Top-10 Average", heading_style))
    tdata = [["Parameter", "Your Score", "Top-10 Avg", "Gap"]]
    for k in KEYS:
        g = data["gaps"][k]
        tdata.append([LABELS[k], str(data["scores"][k]), str(data["top10_avg"][k]),
                      f"+{g}" if g > 0 else ("✓" if g <= 0 else str(g))])
    t = Table(tdata, colWidths=[7.5*cm, 2.8*cm, 2.8*cm, 2.8*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor("#1e3a8a")),
        ("TEXTCOLOR",     (0, 0), (-1, 0), colors.white),
        ("FONTNAME",      (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",      (0, 0), (-1, -1), 9),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1), [colors.HexColor("#f0f4ff"), colors.white]),
        ("GRID",          (0, 0), (-1, -1), 0.4, colors.HexColor("#d1d5db")),
        ("ALIGN",         (1, 0), (-1, -1), "CENTER"),
        ("TOPPADDING",    (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.5*cm))

    # Phases
    story.append(Paragraph("Phase-Wise Improvement Plan", heading_style))
    for pk, phase in data["phases"].items():
        if not phase["items"]:
            continue
        color = colors.HexColor(phase_colors[pk])
        ph_style = ParagraphStyle(pk, parent=styles["Heading3"], textColor=color, spaceBefore=10, spaceAfter=3)
        story.append(Paragraph(f"{phase['title']}  ({phase['duration']})", ph_style))
        story.append(Paragraph(f"<i>Focus: {phase['focus']}</i>", styles["Normal"]))
        story.append(Spacer(1, 0.2*cm))
        for item in phase["items"]:
            story.append(Paragraph(f"<b>{item['label']}</b>  (Score: {item['score']} · Gap: +{item['gap']})", styles["Normal"]))
            for pt in item["points"]:
                story.append(Paragraph(f"• {pt}", styles["Normal"]))
            story.append(Spacer(1, 0.15*cm))
        story.append(Spacer(1, 0.3*cm))

    story.append(Spacer(1, 0.4*cm))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.grey))
    story.append(Spacer(1, 0.2*cm))
    story.append(Paragraph("Generated by NIRF Compass · AI-Powered Strategic Analysis", styles["Normal"]))

    doc.build(story)
    buf.seek(0)
    filename = f"NIRF_Roadmap_{data['university'].replace(' ', '_')}.pdf"
    return StreamingResponse(buf, media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'})
