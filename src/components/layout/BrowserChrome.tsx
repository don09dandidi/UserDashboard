import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, RotateCw, Star, Shield, Download,
  MoreHorizontal, X, Plus, Cloud, Search
} from 'lucide-react';

const routeLabels: Record<string, string> = {
  '/login': 'Sign in — Nimbus',
  '/register': 'Create account — Nimbus',
  '/forgot-password': 'Reset password — Nimbus',
  '/2fa': 'Two-factor verification — Nimbus',
  '/dashboard': 'Dashboard — Nimbus',
  '/files': 'My Files — Nimbus',
  '/shared': 'Shared with me — Nimbus',
  '/recycle-bin': 'Recycle Bin — Nimbus',
  '/notifications': 'Notifications — Nimbus',
  '/settings': 'Settings — Nimbus',
};

const routeUrls: Record<string, string> = {
  '/login': 'nimbus.app/login',
  '/register': 'nimbus.app/register',
  '/forgot-password': 'nimbus.app/forgot-password',
  '/2fa': 'nimbus.app/verify',
  '/dashboard': 'nimbus.app/dashboard',
  '/files': 'nimbus.app/files',
  '/shared': 'nimbus.app/shared',
  '/recycle-bin': 'nimbus.app/recycle-bin',
  '/notifications': 'nimbus.app/notifications',
  '/settings': 'nimbus.app/settings',
};

interface BrowserChromeProps {
  children: React.ReactNode;
}

export function BrowserChrome({ children }: BrowserChromeProps) {
  const location = useLocation();
  const [starred, setStarred] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const tabTitle = routeLabels[location.pathname] ?? 'Nimbus';
  const displayUrl = routeUrls[location.pathname] ?? 'nimbus.app';

  function handleRefresh() {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
  }

  const isChrome = true; // always show chrome look

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: '#1e1e2e', fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Tab bar */}
      <div
        className="flex items-end px-2 pt-2 gap-0 shrink-0 select-none"
        style={{ background: '#292938', height: 38 }}
      >
        {/* Single active tab */}
        <div
          className="flex items-center gap-2 px-3 rounded-t-lg text-xs font-medium shrink-0 relative"
          style={{
            background: '#f8fafc',
            color: '#0f172a',
            height: 30,
            minWidth: 180,
            maxWidth: 240,
          }}
        >
          {/* Tab notch shadows */}
          <span
            className="absolute -left-2 bottom-0 w-2 h-2 rounded-br-lg"
            style={{ background: '#292938', boxShadow: '2px 2px 0 #f8fafc' }}
          />
          <span
            className="absolute -right-2 bottom-0 w-2 h-2 rounded-bl-lg"
            style={{ background: '#292938', boxShadow: '-2px 2px 0 #f8fafc' }}
          />
          <Cloud size={11} style={{ color: '#4f46e5', flexShrink: 0 }} />
          <span className="truncate flex-1" style={{ color: '#334155' }}>{tabTitle}</span>
          <button className="p-0.5 rounded hover:bg-slate-200 transition-colors shrink-0">
            <X size={11} style={{ color: '#94a3b8' }} />
          </button>
        </div>

        {/* New tab button */}
        <button
          className="flex items-center justify-center w-7 h-7 rounded-full mb-0.5 mx-1 transition-colors"
          style={{ color: '#94a3b8' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
        >
          <Plus size={14} />
        </button>

        {/* Spacer + window controls (right side) */}
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 mb-1 mr-1">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 shrink-0"
        style={{ background: '#f8fafc', height: 44, borderBottom: '1px solid #e2e8f0' }}
      >
        {/* Nav buttons */}
        <div className="flex items-center gap-0.5">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#94a3b8' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <ArrowLeft size={15} />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#cbd5e1' }}
          >
            <ArrowRight size={15} />
          </button>
          <button
            onClick={handleRefresh}
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#64748b' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <RotateCw size={13} className={spinning ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Address bar */}
        <div
          className="flex-1 flex items-center gap-2 px-3 rounded-full text-sm"
          style={{ background: '#f1f5f9', height: 30, border: '1px solid #e2e8f0', maxWidth: 520 }}
        >
          <Shield size={12} style={{ color: '#22c55e', flexShrink: 0 }} />
          <span className="flex-1 text-xs font-medium" style={{ color: '#0f172a' }}>
            https://<span style={{ color: '#4f46e5' }}>{displayUrl}</span>
          </span>
          <Search size={12} style={{ color: '#94a3b8', flexShrink: 0 }} />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setStarred(s => !s)}
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
            style={{ color: starred ? '#f59e0b' : '#94a3b8' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <Star size={14} fill={starred ? 'currentColor' : 'none'} />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#94a3b8' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <Download size={14} />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#94a3b8' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
