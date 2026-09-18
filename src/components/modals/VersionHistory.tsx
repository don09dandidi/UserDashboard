import { X } from 'lucide-react';
import type { FileItem } from '../../lib/types';
import { formatDate, formatFileSize } from '../../lib/utils';

interface VersionHistoryProps {
  file: FileItem;
  onClose: () => void;
}

export function VersionHistory({ file, onClose }: VersionHistoryProps) {
  const versions = file.versions ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-xl border shadow-xl overflow-hidden"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--border)' }}>
          <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Version History</span>
          <button onClick={onClose} className="p-1 rounded" style={{ color: 'var(--muted-foreground)' }}><X size={16} /></button>
        </div>
        <div className="p-2">
          {versions.map(v => (
            <div
              key={v.version}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
              style={{ background: v.isCurrent ? 'rgba(79,70,229,0.06)' : 'transparent' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: v.isCurrent ? 'var(--primary)' : 'var(--muted)', color: v.isCurrent ? 'white' : 'var(--muted-foreground)' }}>
                v{v.version}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  Version {v.version}
                  {v.isCurrent && <span className="ml-2 text-xs px-1.5 py-0.5 rounded-sm" style={{ background: 'rgba(79,70,229,0.12)', color: 'var(--primary)' }}>Current</span>}
                </div>
                <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{formatDate(v.date)} · {formatFileSize(v.size)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
