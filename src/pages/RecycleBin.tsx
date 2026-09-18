import { Trash2 } from 'lucide-react';
import { deletedFiles } from '../lib/data';
import { FileTable } from '../components/files/FileTable';

export function RecycleBin() {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Recycle Bin</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Deleted files are kept for 30 days</p>
        </div>
        {deletedFiles.length > 0 && (
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{ borderColor: 'var(--border)', color: '#EF4444' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
            <Trash2 size={14} /> Empty bin
          </button>
        )}
      </div>

      {deletedFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--muted)' }}>
            <Trash2 size={22} style={{ color: 'var(--muted-foreground)' }} />
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Recycle bin is empty</p>
          <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>Deleted files will appear here</p>
        </div>
      ) : (
        <FileTable files={deletedFiles} onPreview={() => {}} deleted />
      )}
    </div>
  );
}
