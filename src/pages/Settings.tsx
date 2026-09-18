import { useState } from 'react';
import { User, Shield, Palette, Smartphone, Sun, Moon } from 'lucide-react';
import { currentUser } from '../lib/data';
import { useApp } from '../context/AppContext';

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ size?: number; className?: string; color?: string }>; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-5" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(79,70,229,0.1)' }}>
          <Icon size={14} color="var(--primary)" />
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
      <label className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{label}</label>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}

export function Settings() {
  const { darkMode, toggleDarkMode } = useApp();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputStyle = {
    background: 'var(--background)',
    borderColor: 'var(--border)',
    color: 'var(--foreground)',
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <SectionCard title="Profile" icon={User}>
        <div className="space-y-0">
          <Field label="Display name">
            <input value={name} onChange={e => setName(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border outline-none w-48"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </Field>
          <Field label="Email">
            <input value={email} onChange={e => setEmail(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border outline-none w-48"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </Field>
          <div className="pt-3">
            <button onClick={handleSave}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              {saved ? '✓ Saved' : 'Save changes'}
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Security / 2FA */}
      <SectionCard title="Security & 2FA" icon={Shield}>
        <div className="space-y-0">
          <Field label="Two-factor authentication">
            <span className="text-xs" style={{ color: twoFAEnabled ? '#22C55E' : 'var(--muted-foreground)' }}>
              {twoFAEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <button
              onClick={() => setTwoFAEnabled(e => !e)}
              className="relative w-10 h-5.5 rounded-full transition-colors"
              style={{
                background: twoFAEnabled ? 'var(--primary)' : 'var(--border)',
                width: 40,
                height: 22,
              }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform"
                style={{
                  width: 18,
                  height: 18,
                  transform: twoFAEnabled ? 'translateX(18px)' : 'translateX(0)',
                }}
              />
            </button>
          </Field>
          {twoFAEnabled && (
            <div className="py-3">
              <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>
                <Smartphone size={14} />
                Authenticator app connected
              </div>
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                View backup codes
              </button>
            </div>
          )}
          <Field label="Change password">
            <button className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Update</button>
          </Field>
        </div>
      </SectionCard>

      {/* Appearance */}
      <SectionCard title="Appearance" icon={Palette}>
        <Field label="Theme">
          <div className="flex items-center gap-2">
            <button
              onClick={() => !darkMode && toggleDarkMode()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-all"
              style={{
                borderColor: darkMode ? 'var(--border)' : 'var(--primary)',
                background: darkMode ? 'transparent' : 'rgba(79,70,229,0.08)',
                color: darkMode ? 'var(--muted-foreground)' : 'var(--primary)',
              }}>
              <Sun size={14} /> Light
            </button>
            <button
              onClick={() => darkMode && toggleDarkMode()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-all"
              style={{
                borderColor: !darkMode ? 'var(--border)' : 'var(--primary)',
                background: !darkMode ? 'transparent' : 'rgba(79,70,229,0.12)',
                color: !darkMode ? 'var(--muted-foreground)' : 'var(--primary)',
              }}>
              <Moon size={14} /> Dark
            </button>
          </div>
        </Field>
      </SectionCard>
    </div>
  );
}
