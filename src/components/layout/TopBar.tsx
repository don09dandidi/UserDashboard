import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { currentUser } from '../../lib/data';

interface TopBarProps {
  onMenuToggle?: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const { searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) navigate('/files?search=' + encodeURIComponent(searchQuery));
  }

  return (
    <header
      className="flex items-center gap-4 px-5 h-14 border-b shrink-0"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {/* Mobile menu toggle */}
      {onMenuToggle && (
        <button onClick={onMenuToggle} className="md:hidden p-1.5 rounded-md" style={{ color: 'var(--muted-foreground)' }}>
          <div className="space-y-1">
            <span className="block w-5 h-0.5 rounded" style={{ background: 'currentColor' }} />
            <span className="block w-5 h-0.5 rounded" style={{ background: 'currentColor' }} />
            <span className="block w-5 h-0.5 rounded" style={{ background: 'currentColor' }} />
          </div>
        </button>
      )}

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search files and folders..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none transition-all"
            style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            onFocus={e => e.target.style.borderColor = 'var(--primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
      </form>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-lg transition-all"
          style={{ color: 'var(--muted-foreground)' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }} />
        </button>

        {/* User */}
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-all"
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            {currentUser.avatar}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-medium leading-none" style={{ color: 'var(--foreground)' }}>{currentUser.name}</div>
            <div className="text-xs leading-none mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{currentUser.email}</div>
          </div>
        </button>
      </div>
    </header>
  );
}
