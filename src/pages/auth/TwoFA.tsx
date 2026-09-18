import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { useApp } from '../../context/AppContext';

export function TwoFA() {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const { setIsAuthenticated } = useApp();
  const navigate = useNavigate();

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);
    if (value && index < 5) refs[index + 1].current?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/dashboard');
  }

  const inputStyle = {
    background: 'var(--background)',
    borderColor: 'var(--border)',
    color: 'var(--foreground)',
  };

  return (
    <AuthLayout title="Two-factor verification" subtitle="Enter the 6-digit code from your authenticator app">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2 justify-center">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="text"
              inputMode="numeric"
              value={d}
              maxLength={1}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-11 h-12 text-center text-lg font-semibold rounded-lg border outline-none transition-all"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          ))}
        </div>
        <button type="submit" className="w-full py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          Verify
        </button>
      </form>
      <p className="mt-4 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
        Didn't receive a code?{' '}
        <button className="font-medium" style={{ color: 'var(--primary)' }}>Resend</button>
      </p>
    </AuthLayout>
  );
}
