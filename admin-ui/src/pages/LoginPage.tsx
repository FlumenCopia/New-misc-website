import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { BrandLogo } from '../components/common/BrandLogo';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@miscarchive.com');
  const [password, setPassword] = useState('admin123456');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg p-8 shadow-sm relative z-10">
        <div className="text-center mb-7">
          <div className="flex justify-center mb-4">
            <BrandLogo size="lg" showBadge theme="on-light" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin CMS Console</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to manage website pages, content, and media
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-rose-50 border border-rose-200 rounded-md flex items-center gap-3 text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@miscarchive.com"
                className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500 shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-brand-500 shadow-xs"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 mt-2"
            isLoading={loading}
          >
            Sign In to Console
          </Button>
        </form>

        <div className="mt-7 pt-5 border-t border-slate-100 text-center">
          <p className="text-[11.5px] text-slate-500">
            Default credentials: <span className="text-slate-800 font-mono font-medium">admin@miscarchive.com</span> /{' '}
            <span className="text-slate-800 font-mono font-medium">admin123456</span>
          </p>
        </div>
      </div>
    </div>
  );
};
