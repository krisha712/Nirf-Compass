# NIRF Compass - Installation Guide

## Quick Start

### Step 1: Install Dependencies

```bash
cd nirf-compass
npm install
```

This will install all required packages including:
- React and React DOM
- React Router v6
- Zustand (state management)
- jsPDF (PDF generation)
- Tailwind CSS
- Framer Motion
- And more...

### Step 2: Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Step 3: Build for Production

```bash
npm run build
```

Production files will be generated in the `dist/` directory.

## Features Overview

### 1. Header Navigation
- Home
- Analyze (main analysis page)
- Search History (view past analyses)
- About Us (platform information)
- Contact Us (contact form and FAQ)

### 2. Core Pages

**Landing Page** (`/`)
- Platform introduction
- Feature highlights
- How it works section

**Analysis Page** (`/analysis`)
- Enter university name
- AI-powered analysis
- Auto-generated NIRF scores
- Strategic recommendations

**Roadmap Page** (`/roadmap`)
- 3-phase improvement plan
- Immediate actions (0-6 months)
- Structural improvements (6-18 months)
- Strategic positioning (18+ months)

**Report Page** (`/report`)
- Report preview
- Executive summary
- SWOT analysis preview
- Download PDF button

**Search History** (`/history`)
- View all past analyses
- Quick access to previous reports
- Download PDFs
- Delete entries

**About Page** (`/about`)
- Mission statement
- NIRF framework explanation
- How the system works
- Technology stack
- Academic disclaimer

**Contact Page** (`/contact`)
- Contact form with validation
- Institutional contact information
- FAQ accordion section

### 3. PDF Generation

Reports are generated as professional multi-page PDFs including:
- Cover page
- Executive summary
- Auto-generated NIRF scores
- Parameter-wise gap analysis
- Detailed recommendations
- Strategic roadmap
- SWOT analysis
- Final consultant remarks

### 4. Search History

All analyses are automatically saved to browser localStorage:
- Persistent across sessions
- Quick view and download
- Individual deletion
- Clear all option

## Customization

### Adding Universities to Database

Edit `src/services/nirfService.js`:

```javascript
const universityDatabase = {
  'Your University': { tlr: 85, rp: 78, go: 82, oi: 80, pr: 75 },
  // Add more...
};
```

### Modifying Footer Information

Edit `src/components/layout/Footer.jsx`:

```javascript
// Update publisher information
<p className="font-semibold text-gray-700">Your Department</p>
<p>Your Institution</p>
```

### Changing Color Scheme

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#1E3A8A', // Your primary color
  },
}
```

## Troubleshooting

### Port Already in Use

```bash
npm run dev -- --port 3000
```

### Clear Cache

```bash
rm -rf node_modules dist
npm install
```

### PDF Not Downloading

Ensure jsPDF is properly installed:

```bash
npm install jspdf
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design

## Data Storage

- Analysis history: localStorage
- No server-side storage
- Data persists in browser only
- Clear browser data to reset

## Production Deployment

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload `dist/` folder to Netlify

## Support

For issues or questions:
- Email: nirfcompass@cspit.edu
- Check FAQ on Contact page
- Review documentation

## Academic Use

This platform is designed for academic research and strategic planning purposes. 
It is not an official NIRF submission tool.

---

**CSPIT AIML Department**  
Charotar University of Science and Technology  
2026
