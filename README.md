# NIRF Compass

AI-Powered University Ranking Improvement System - Professional SaaS Platform

## Overview

NIRF Compass is a production-grade React application that provides intelligent analysis of university performance across NIRF (National Institutional Ranking Framework) parameters. The system automatically generates scores, identifies gaps, and produces comprehensive strategic improvement reports in professional PDF format.

## Key Features

### Core Functionality
- **AI-Powered Analysis**: Automated score generation based on university name
- **Intelligent Assessment**: Real-time analysis of all 5 NIRF parameters
  - Teaching, Learning & Resources (TLR)
  - Research & Professional Practice (RP)
  - Graduation Outcomes (GO)
  - Outreach & Inclusivity (OI)
  - Perception (PR)
- **Strategic Insights**: Gap analysis, risk assessment, and priority recommendations
- **Professional PDF Reports**: Downloadable strategic improvement documents with SWOT analysis
- **Phased Roadmap**: 3-phase implementation plan (Immediate, Structural, Strategic)

### Platform Features
- **Persistent Header**: Professional navigation with sticky header
- **Structured Footer**: 4-column footer with institutional information
- **Search History**: Local storage of all analyses with quick access
- **About Us Page**: Comprehensive platform information and mission
- **Contact Page**: Contact form with validation and FAQ section
- **Responsive Design**: Mobile-first approach with hamburger menu

### PDF Generation
- Multi-page professional PDF reports
- Structured sections with proper formatting
- SWOT analysis included
- Generated timestamp and system signature
- Download directly from browser

## Tech Stack

- **React 18** with Vite
- **React Router v6** for navigation
- **Zustand** for state management (with persist middleware)
- **React Hook Form** for form handling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Query** for data fetching
- **React Toastify** for notifications
- **jsPDF** for PDF generation

💻 Frontend Setup
npm install
npm start

👉 Runs on: http://localhost:3000

🛠️ Backend Setup
cd backend
pip install -r requirements.txt
python main.py

👉 Runs on: http://127.0.0.1:8000

🔗 API Communication

The frontend communicates with the backend using REST APIs.

Example:

fetch("http://127.0.0.1:8000/api/data")
  .then(res => res.json())
  .then(data => console.log(data));
```

## Project Structure

```
## 🏗️ Project Structure

```bash
nirf-compass/
│
├── src/                          # Frontend source code (React)
│   ├── components/               # Reusable UI components
│   │   ├── layout/               # Header, Footer, MainLayout
│   │   ├── common/               # Shared components
│   │   ├── ScoreCard.jsx
│   │   ├── ParameterAccordion.jsx
│   │   └── LoadingAnalysis.jsx
│   │
│   ├── pages/                    # Application pages
│   │   ├── LandingPage.jsx
│   │   ├── AnalysisPage.jsx
│   │   ├── RoadmapPage.jsx
│   │   ├── ReportPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── SearchHistoryPage.jsx
│   │
│   ├── services/                 # Business logic
│   │   ├── nirfService.js
│   │   ├── reportService.js
│   │   └── pdfService.js
│   │
│   ├── store/                    # State management
│   │   ├── analysisStore.js
│   │   └── historyStore.js
│   │
│   ├── routes/                   # Routing configuration
│   ├── utils/                    # Helper functions
│   ├── styles/                   # Global styles
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/                       # Static frontend assets
├── index.html                    # Frontend entry HTML
│
├── backend/                      # Backend (Python API)
│   ├── routes/                   # API endpoints
│   ├── models/                   # Data models
│   ├── data/                     # Dataset / JSON files
│   ├── main.py                   # Backend entry point
│   └── requirements.txt          # Backend dependencies
│
├── README.md                     # Main documentation
└── .gitignore                    # Ignored files
```
index.html
```

## Usage Flow

1. **Landing Page**: Introduction and feature overview
2. **Analysis Page**: Enter university name → AI analysis → Results display
3. **View Results**: Auto-generated scores and strategic recommendations
4. **Roadmap**: Phased improvement plan across 3 timelines
5. **Download Report**: Professional PDF strategic improvement document
6. **Search History**: Access previous analyses and download PDFs
7. **About/Contact**: Learn more and get in touch

## Design Philosophy

- **Professional & Authoritative**: Consulting-grade interface
- **Intelligent & Automated**: No manual data entry
- **Clean & Structured**: Text-based strategic output
- **Scalable Architecture**: Separation of concerns, reusable components
- **Academic Credibility**: Institutional footer and proper attribution

## Color Scheme

- Primary: Deep Blue (#1E3A8A)
- Accent: Soft Indigo (#6366F1)
- Background: #F9FAFB
- Text: #2E2E2E

## Features in Detail

### Header
- Sticky navigation
- Logo with tagline
- Navigation links: Home, Analyze, Search History, About Us, Contact Us
- Login/Profile dropdown
- Responsive mobile menu

### Footer
- About Platform description
- Policy links (Privacy, Terms, Data Usage, AI Transparency)
- Publisher Information (CSPIT AIML Department)
- Created By section
- Copyright notice

### Search History
- Persistent storage using localStorage
- View previous analyses
- Download PDF reports
- Delete individual entries
- Clear all history

### PDF Reports
- Professional multi-page layout
- Cover page with branding
- Executive summary
- Auto-generated scores
- Gap analysis
- Detailed recommendations
- Strategic roadmap
- SWOT analysis
- Final consultant remarks
- Timestamp and signature

## Academic Information

**Publisher**: CSPIT AIML Department  
**Institution**: Charotar University of Science and Technology  
**Project Type**: Academic Research Platform  
**Year**: 2026

⚠️ CORS Configuration (Important)

To allow frontend and backend communication:

FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Flask
from flask_cors import CORS
CORS(app)

## License

Proprietary - All rights reserved
