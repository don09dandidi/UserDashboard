import { useState } from 'react';
import { Share2, MessageSquare, Cloud, CheckCheck } from 'lucide-react';
import { mockNotifications } from '../lib/data';
import type { Notification } from '../lib/types';
import { formatDateTime } from '../lib/utils';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; color?: string }>> = {
  share: Share2,
  message: MessageSquare,
  cloud: Cloud,
};

const iconColors: Record<string, string> = {
  share: '#4F46E5',
  message: '#06B6D4',
  cloud: '#F59E0B',
};

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(n => n.map(item => ({ ...item, read: true })));
  }

  function markRead(id: string) {
    setNotifications(n => n.map(item => item.id === id ? { ...item, read: true } : item));
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Notifications</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <CheckCheck size={15} />
            Mark all read
          </button>
        )}
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        {notifications.map((n, i) => {
          const Icon = iconMap[n.icon];
          const color = iconColors[n.icon];
          return (
            <div
              key={n.id}
              className="flex items-start gap-3.5 px-5 py-4 border-b last:border-0 cursor-pointer transition-colors"
              style={{
                borderColor: 'var(--border)',
                background: n.read ? 'transparent' : 'rgba(79,70,229,0.03)',
              }}
              onClick={() => markRead(n.id)}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = n.read ? 'transparent' : 'rgba(79,70,229,0.03)'}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${color}18` }}>
                <Icon size={15} color={color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug" style={{ color: 'var(--foreground)', fontWeight: n.read ? 400 : 500 }}>{n.text}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{formatDateTime(n.date)}</p>
              </div>
              {!n.read && (
                <div className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ background: 'var(--primary)' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
