import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface UploadProgressProps {
  fileName: string;
  onDone: () => void;
  type?: 'upload' | 'download';
}

export function UploadProgress({ fileName, onDone, type = 'upload' }: UploadProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 800); return 100; }
        return p + Math.random() * 8;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const pct = Math.min(Math.round(progress), 100);

  return (
    <div
      className="fixed bottom-5 right-5 w-72 rounded-xl border shadow-lg p-4 z-40"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>
            {type === 'upload' ? 'Uploading' : 'Downloading'} {fileName}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{pct}% complete</div>
        </div>
        <button onClick={onDone} className="p-0.5" style={{ color: 'var(--muted-foreground)' }}><X size={14} /></button>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{ width: `${pct}%`, background: 'var(--primary)' }}
        />
      </div>
    </div>
  );
}
