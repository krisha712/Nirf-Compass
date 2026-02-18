# NIRF Compass - Quick Start Guide

## 🚀 Get Running in 3 Steps

### Step 1: Install Dependencies
```bash
cd nirf-compass
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to: `http://localhost:5173`

---

## 🎯 First Time Usage

### 1. Explore the Landing Page
- Read about the platform
- Understand the features
- Click "Start Analysis"

### 2. Analyze a University
- Enter a university name (e.g., "IIT Delhi")
- Click "Analyze University"
- Wait 2-3 seconds for AI analysis
- View auto-generated scores

### 3. Review Results
- Check all 5 NIRF parameter scores
- Expand accordions for detailed recommendations
- Click "View Improvement Roadmap"

### 4. Download Report
- Navigate to "Download Strategic Report"
- Review report preview
- Click "Download Strategic Improvement Report (PDF)"
- PDF will download automatically

### 5. Check History
- Click "Search History" in header
- View your previous analysis
- Download PDF again if needed
- Try analyzing another university

---

## 📋 Sample Universities to Try

### Pre-configured (Best Results)
- IIT Delhi
- IIT Bombay
- IIT Madras
- IISc Bangalore
- AIIMS Delhi

### Any Other University
- Enter any university name
- System will generate realistic scores
- All features work the same way

---

## 🎨 Key Features to Test

### ✅ Header Navigation
- Click each menu item
- Test mobile menu (resize browser)
- Try login/logout

### ✅ Analysis Flow
1. Home → Analyze
2. Enter university name
3. View loading animation
4. See score cards
5. Expand accordions
6. Navigate to roadmap
7. Download PDF

### ✅ Search History
- Analyze multiple universities
- View history list
- Click "View" to see analysis
- Click "PDF" to download
- Delete individual entries
- Clear all history

### ✅ Contact Form
- Fill out all fields
- Test validation (try invalid email)
- Submit form
- See success toast

### ✅ FAQ Section
- Click questions to expand
- Read answers
- Click again to collapse

### ✅ PDF Reports
- Download from Report page
- Download from History page
- Open PDF and review:
  - Cover page
  - Executive summary
  - Scores
  - Gap analysis
  - Recommendations
  - Roadmap
  - SWOT analysis
  - Final remarks

---

## 🔧 Troubleshooting

### Port Already in Use?
```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### PDF Not Downloading?
- Check browser download settings
- Allow downloads from localhost
- Try different browser

### History Not Saving?
- Check browser localStorage is enabled
- Don't use incognito/private mode
- Clear browser cache and try again

---

## 📱 Test Responsive Design

### Desktop (1920x1080)
- Full navigation visible
- 3-column layouts
- All features accessible

### Tablet (768x1024)
- 2-column layouts
- Hamburger menu appears
- Touch-friendly buttons

### Mobile (375x667)
- Single column
- Hamburger menu
- Stacked cards
- Large tap targets

---

## 🎓 Understanding the System

### What It Does
- Analyzes university NIRF performance
- Generates strategic recommendations
- Creates professional PDF reports
- Saves analysis history

### What It Doesn't Do
- Real NIRF submissions
- Official rankings
- Live data fetching
- Server-side storage

### Data Storage
- All data stored in browser localStorage
- No server communication
- Persists across sessions
- User controls deletion

---

## 📊 Expected Behavior

### Analysis Time
- 2-3 seconds loading
- Realistic AI simulation
- Smooth animations

### Score Generation
- Known universities: Pre-configured scores
- Unknown universities: Algorithmic generation
- All scores: 0-100 range
- Realistic distribution

### PDF Generation
- Takes 1-2 seconds
- Multi-page document
- Professional formatting
- Direct download

---

## 🎯 Testing Checklist

- [ ] Install dependencies successfully
- [ ] Start dev server
- [ ] Navigate all pages
- [ ] Analyze a university
- [ ] View scores and recommendations
- [ ] Check roadmap
- [ ] Download PDF report
- [ ] Verify PDF content
- [ ] Test search history
- [ ] Fill contact form
- [ ] Read FAQ
- [ ] Test mobile responsive
- [ ] Check footer links
- [ ] Test policy pages

---

## 💡 Tips

1. **Try Multiple Universities**: See how scores vary
2. **Compare Reports**: Download PDFs for different universities
3. **Test History**: Build up history, then clear it
4. **Mobile Testing**: Use browser dev tools
5. **PDF Review**: Open PDFs to see full formatting

---

## 🆘 Need Help?

### Documentation
- README.md - Overview
- INSTALLATION.md - Detailed setup
- FEATURES.md - Complete feature list
- PROJECT_SUMMARY.md - Project details

### Contact
- Email: nirfcompass@cspit.edu
- Use Contact page in app
- Check FAQ section

---

## 🎉 You're Ready!

The platform is fully functional and ready to use. Explore all features, test thoroughly, and enjoy the professional SaaS experience!

**Happy Analyzing! 🚀**
