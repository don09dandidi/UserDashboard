import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Files, Share2, Trash2, Bell, Settings, Cloud } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/files', icon: Files, label: 'My Files' },
  { to: '/shared', icon: Share2, label: 'Shared with me' },
  { to: '/recycle-bin', icon: Trash2, label: 'Recycle Bin' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className="flex flex-col h-full border-r"
      style={{ background: 'var(--card)', borderColor: 'var(--border)', width: collapsed ? 64 : 220 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
        <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: 'var(--primary)' }}>
          <Cloud size={14} color="white" />
        </div>
        {!collapsed && <span className="text-base font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>Nimbus</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-hidden">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));
          return (
            <NavLink
              key={to}
              to={to}
              className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: active ? 'rgba(79,70,229,0.08)' : 'transparent',
                color: active ? 'var(--primary)' : 'var(--muted-foreground)',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--muted)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Storage */}
      {!collapsed && (
        <div className="px-4 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--muted-foreground)' }}>
            <span>Storage</span>
            <span>68 / 100 GB</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: '68%', background: 'var(--primary)' }} />
          </div>
        </div>
      )}
    </aside>
  );
}
