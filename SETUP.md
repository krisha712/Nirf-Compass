# NIRF Compass - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Quick Start

### 1. Install Dependencies

```bash
cd nirf-compass
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

Production files will be in the `dist/` directory.

## Project Features

### Automatic Score Generation

The system includes intelligent score generation logic in `src/services/nirfService.js`:

- Pre-configured scores for top universities (IIT Delhi, IIT Bombay, etc.)
- Algorithmic score generation for unknown universities
- Realistic score distribution based on university name

### State Management

Uses Zustand for lightweight, efficient state management:
- Analysis data storage
- Loading states
- Error handling

### Routing Structure

- `/` - Landing page with feature overview
- `/analysis` - Main analysis interface
- `/roadmap` - Strategic improvement roadmap
- `/report` - Report preview and download

## Customization

### Adding Universities to Database

Edit `src/services/nirfService.js`:

```javascript
const universityDatabase = {
  'Your University': { tlr: 85, rp: 78, go: 82, oi: 80, pr: 75 },
  // Add more universities...
};
```

### Modifying Color Scheme

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#1E3A8A', // Change primary color
    // ...
  },
}
```

### Customizing Report Format

Edit `src/services/reportService.js` to modify report structure and content.

## Architecture Highlights

### Clean Separation of Concerns

- **Components**: Pure UI components
- **Pages**: Route-level components
- **Services**: Business logic and data processing
- **Store**: Global state management
- **Utils**: Helper functions

### Performance Optimizations

- Code splitting via React Router
- Lazy loading of components
- Optimized re-renders with Zustand
- Efficient form handling with React Hook Form

### Professional UX

- Loading states with animations
- Toast notifications for user feedback
- Responsive design for all screen sizes
- Accessible form validation
- Smooth page transitions

## Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
npm run dev -- --port 3000
```

### Build Errors

Clear cache and reinstall:

```bash
rm -rf node_modules dist
npm install
npm run build
```

### Path Alias Issues

Ensure `jsconfig.json` is present and properly configured for `@/` imports.

## Production Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## Support

For issues or questions, refer to the main README.md or project documentation.
