# NIRF Compass - Deployment Guide

## 🚀 Production Deployment Options

### Option 1: Vercel (Recommended)

#### Prerequisites
- GitHub account
- Vercel account (free)

#### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel auto-detects Vite
- Click "Deploy"

3. **Configuration**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

4. **Done!**
- Your app is live at `your-app.vercel.app`
- Auto-deploys on every push

---

### Option 2: Netlify

#### Steps

1. **Build Locally**
```bash
npm run build
```

2. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop `dist` folder
- Or connect GitHub repo

3. **Configuration**
- Build Command: `npm run build`
- Publish Directory: `dist`

4. **Custom Domain** (Optional)
- Add custom domain in Netlify settings
- Update DNS records

---

### Option 3: GitHub Pages

#### Steps

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/nirf-compass",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js**
```javascript
export default defineConfig({
  base: '/nirf-compass/',
  // ... rest of config
})
```

4. **Deploy**
```bash
npm run deploy
```

---

### Option 4: Traditional Web Hosting

#### Steps

1. **Build for Production**
```bash
npm run build
```

2. **Upload Files**
- Upload entire `dist` folder to your web host
- Via FTP, cPanel, or hosting dashboard

3. **Configure Server**
- Point domain to `dist` folder
- Enable SPA routing (if needed)

4. **Apache .htaccess** (if using Apache)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

5. **Nginx Configuration** (if using Nginx)
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 🔧 Pre-Deployment Checklist

### Code Quality
- [ ] No console errors
- [ ] All features working
- [ ] Forms validated
- [ ] PDFs generating correctly
- [ ] History saving/loading
- [ ] Mobile responsive

### Performance
- [ ] Run `npm run build`
- [ ] Check bundle size
- [ ] Test production build locally
- [ ] Optimize images (if any)

### Configuration
- [ ] Update base URL (if needed)
- [ ] Check API endpoints (none in this app)
- [ ] Verify environment variables (none needed)
- [ ] Update contact information
- [ ] Check footer details

### Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile devices
- [ ] Test all routes
- [ ] Test PDF downloads
- [ ] Test form submissions

---

## 🌐 Custom Domain Setup

### Vercel
1. Go to Project Settings
2. Click "Domains"
3. Add your domain
4. Update DNS records:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records:
   - Type: CNAME
   - Name: www
   - Value: your-site.netlify.app

---

## 📊 Post-Deployment

### Verify Functionality
1. Visit deployed URL
2. Test all pages
3. Analyze a university
4. Download PDF
5. Check history
6. Submit contact form
7. Test on mobile

### Monitor
- Check browser console for errors
- Test PDF downloads
- Verify localStorage works
- Check responsive design

### Share
- Share URL with team
- Get feedback
- Make improvements

---

## 🔒 Security Considerations

### Already Implemented
- ✅ No server-side code
- ✅ No API keys to expose
- ✅ No database connections
- ✅ Client-side only
- ✅ No sensitive data storage

### Best Practices
- Use HTTPS (automatic on Vercel/Netlify)
- Keep dependencies updated
- Monitor for vulnerabilities
- Regular security audits

---

## 📈 Performance Optimization

### Already Optimized
- ✅ Code splitting (React Router)
- ✅ Tree shaking (Vite)
- ✅ Minification (production build)
- ✅ Lazy loading
- ✅ Efficient state management

### Additional Optimizations
```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer
```

---

## 🐛 Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Routes Not Working
- Add SPA redirect rules
- Check base URL in vite.config.js
- Verify hosting supports SPA

### PDF Not Downloading
- Check browser compatibility
- Verify jsPDF is in dependencies
- Test in different browsers

### History Not Persisting
- Ensure localStorage is enabled
- Check browser privacy settings
- Verify Zustand persist middleware

---

## 📱 Mobile App (Future)

### Progressive Web App (PWA)
Can be converted to PWA by adding:
- Service worker
- Web app manifest
- Offline support
- Install prompt

### React Native
Can be adapted to React Native for:
- iOS app
- Android app
- Native features

---

## 🔄 Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📞 Support

### Deployment Issues
- Check hosting provider docs
- Review build logs
- Test locally first
- Contact hosting support

### Application Issues
- Review browser console
- Check network tab
- Test in incognito mode
- Clear cache and cookies

---

## ✅ Deployment Success Checklist

- [ ] App builds successfully
- [ ] All routes accessible
- [ ] PDFs download correctly
- [ ] History persists
- [ ] Forms work
- [ ] Mobile responsive
- [ ] Fast load times
- [ ] No console errors
- [ ] HTTPS enabled
- [ ] Custom domain (optional)

---

## 🎉 You're Live!

Your NIRF Compass platform is now deployed and accessible to users worldwide!

**Deployment Complete! 🚀**

---

**Need Help?**  
Email: nirfcompass@cspit.edu  
Documentation: Check all .md files in project root
