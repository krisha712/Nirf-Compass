// Backend API service – calls FastAPI at localhost:8000
const BASE = 'http://localhost:8000';

function authHeaders() {
  const token = localStorage.getItem('nirf_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: 'Bearer ' + token } : {}),
  };
}

function handleUnauthorized() {
  localStorage.removeItem('nirf_token');
  window.location.href = '/';
}

// POST /signup
export async function apiSignup(name, email, password) {
  const res = await fetch(BASE + '/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Signup failed');
  }
  const data = await res.json();
  localStorage.setItem('nirf_token', data.token);
  return data;
}

// POST /login
export async function apiLogin(email, password) {
  const res = await fetch(BASE + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Login failed');
  }
  const data = await res.json();
  localStorage.setItem('nirf_token', data.token);
  return data; // { token, userId, email }
}

// POST /analyze
export async function apiAnalyze(universityName) {
  const res = await fetch(BASE + '/analyze', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ university_name: universityName }),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error('Session expired. Please login again.');
  }
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Analysis failed');
  }
  return res.json();
}

// POST /history – save a search
export async function apiSaveHistory(university) {
  const res = await fetch(BASE + '/history', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ university }),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error('Session expired. Please login again.');
  }
  // non-critical – don't throw on other errors, just log
  if (!res.ok) {
    console.warn('Failed to save history:', await res.text());
  }
}

// GET /history
export async function apiGetHistory() {
  const res = await fetch(BASE + '/history', {
    headers: authHeaders(),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error('Session expired. Please login again.');
  }
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to fetch history');
  }
  return res.json();
}

export function apiLogout() {
  localStorage.removeItem('nirf_token');
}

// POST /roadmap
export async function apiGetRoadmap(university) {
  const res = await fetch(BASE + '/roadmap', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ university }),
  });
  if (res.status === 401) { handleUnauthorized(); throw new Error('Session expired.'); }
  if (!res.ok) { const e = await res.json(); throw new Error(e.detail || 'Failed to load roadmap'); }
  return res.json();
}

// POST /roadmap/pdf – triggers file download
export async function apiDownloadRoadmapPDF(university) {
  const res = await fetch(BASE + '/roadmap/pdf', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ university }),
  });
  if (res.status === 401) { handleUnauthorized(); throw new Error('Session expired.'); }
  if (!res.ok) throw new Error('Failed to generate PDF');
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `NIRF_Roadmap_${university.replace(/\s+/g, '_')}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
