import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { useApp } from '../../context/AppContext';

export function Login() {
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated } = useApp();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/dashboard');
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Nimbus account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border outline-none transition-all"
              style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border outline-none transition-all"
              style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs font-medium" style={{ color: 'var(--primary)' }}>Forgot password?</Link>
        </div>
        <button type="submit" className="w-full py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          Sign in
        </button>
      </form>
      <p className="mt-6 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
        Don't have an account?{' '}
        <Link to="/register" className="font-medium" style={{ color: 'var(--primary)' }}>Create account</Link>
      </p>
    </AuthLayout>
  );
}
