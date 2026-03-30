import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { apiLogin, apiSignup } from '@/services/apiService';

const BASE = 'http://localhost:8000';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [mode, setMode] = useState('default'); // default | login | signup
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const reset = () => {
    setForm({ name: '', email: '', password: '', confirm: '' });
    setError('');
  };

  const switchMode = (m) => { reset(); setMode(m); };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Google
  const handleGoogle = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.detail); }
      const data = await res.json();
      localStorage.setItem('nirf_token', data.token);
      onLogin(data.email);
      toast.success(`Welcome, ${data.name || data.email}!`);
      onClose();
    } catch (e) {
      toast.error(e.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiLogin(form.email, form.password);
      onLogin(data.email);
      toast.success('Welcome back!');
      onClose();
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  // Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const data = await apiSignup(form.name, form.email, form.password);
      onLogin(data.email);
      toast.success(`Account created! Welcome, ${data.name}!`);
      onClose();
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">

        {/* Close */}
        <div className="flex justify-end p-4 pb-0">
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="px-8 pb-8 pt-2 space-y-5">
          {/* Logo / Title */}
          <div className="text-center">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'default' ? 'Welcome to NIRF Compass' : mode === 'login' ? 'Sign in' : 'Create account'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === 'default' ? 'University improvement system' :
               mode === 'login' ? 'Sign in to your account' : 'Join NIRF Compass today'}
            </p>
          </div>

          {/* Google button — always visible */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogle}
              onError={() => toast.error('Google login failed')}
              text={mode === 'signup' ? 'signup_with' : 'continue_with'}
              shape="rectangular"
              width="320"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Default mode — just links */}
          {mode === 'default' && (
            <div className="space-y-3 text-center">
              <button
                onClick={() => switchMode('login')}
                className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign in with email
              </button>
              <p className="text-sm text-gray-500">
                New here?{' '}
                <button onClick={() => switchMode('signup')} className="text-primary font-semibold hover:underline">
                  Create an account
                </button>
              </p>
            </div>
          )}

          {/* Login form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                name="email" type="email" placeholder="Email address"
                value={form.email} onChange={handleChange} required
                className="input-field" disabled={loading}
              />
              <input
                name="password" type="password" placeholder="Password"
                value={form.password} onChange={handleChange} required
                className="input-field" disabled={loading}
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Demo: admin@nirf.com / admin123
              </p>
              <p className="text-sm text-center text-gray-500">
                New here?{' '}
                <button type="button" onClick={() => switchMode('signup')} className="text-primary font-semibold hover:underline">
                  Sign up
                </button>
              </p>
            </form>
          )}

          {/* Signup form */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-3">
              <input
                name="name" type="text" placeholder="Full name"
                value={form.name} onChange={handleChange} required
                className="input-field" disabled={loading}
              />
              <input
                name="email" type="email" placeholder="Email address"
                value={form.email} onChange={handleChange} required
                className="input-field" disabled={loading}
              />
              <input
                name="password" type="password" placeholder="Password (min 6 chars)"
                value={form.password} onChange={handleChange} required
                className="input-field" disabled={loading}
              />
              <input
                name="confirm" type="password" placeholder="Confirm password"
                value={form.confirm} onChange={handleChange} required
                className="input-field" disabled={loading}
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Creating account...' : 'Create account'}
              </button>
              <p className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <button type="button" onClick={() => switchMode('login')} className="text-primary font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
