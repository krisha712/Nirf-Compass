from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.login        import router as login_router
from routes.signup       import router as signup_router
from routes.analyze      import router as analyze_router
from routes.history      import router as history_router
from routes.roadmap      import router as roadmap_router
from routes.google_auth  import router as google_auth_router

app = FastAPI(title="NIRF Compass API", version="1.0.0")

# ── CORS – allow React frontend ───────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(login_router,       tags=["Auth"])
app.include_router(signup_router,      tags=["Auth"])
app.include_router(google_auth_router, tags=["Auth"])
app.include_router(analyze_router,     tags=["Analysis"])
app.include_router(history_router,     tags=["History"])
app.include_router(roadmap_router,     tags=["Roadmap"])


@app.get("/")
def root():
    return {"message": "NIRF Compass API is running", "docs": "/docs"}
