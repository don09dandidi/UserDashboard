import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { useApp } from '../../context/AppContext';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useApp();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/2fa');
  }

  const inputStyle = {
    background: 'var(--background)',
    borderColor: 'var(--border)',
    color: 'var(--foreground)',
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start storing files securely in the cloud">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Full name</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Alex Morgan"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>
        <button type="submit" className="w-full py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 mt-2" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          Create account
        </button>
      </form>
      <p className="mt-6 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
        Already have an account?{' '}
        <Link to="/login" className="font-medium" style={{ color: 'var(--primary)' }}>Sign in</Link>
      </p>
    </AuthLayout>
  );
}
