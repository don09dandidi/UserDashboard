import { Cloud } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary)' }}>
              <Cloud size={20} color="white" />
            </div>
            <span className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Nimbus</span>
          </div>
          <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{title}</h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{subtitle}</p>
        </div>
        <div className="rounded-xl p-8 shadow-sm border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
