import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthLayout } from './AuthLayout';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="We've sent you a password reset link">
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ background: 'rgba(79,70,229,0.1)' }}>
            <CheckCircle size={28} style={{ color: 'var(--primary)' }} />
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
            We sent a reset link to <strong style={{ color: 'var(--foreground)' }}>{email}</strong>. Check your inbox and follow the instructions.
          </p>
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--primary)' }}>
            <ArrowLeft size={16} />
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot password?" subtitle="Enter your email and we'll send you a reset link">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border outline-none"
              style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>
        <button type="submit" className="w-full py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          Send reset link
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        <Link to="/login" className="inline-flex items-center gap-1.5 font-medium" style={{ color: 'var(--primary)' }}>
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
