import { useState } from 'react';
import { MoreHorizontal, Download, History, MessageSquare, Trash2, Eye } from 'lucide-react';
import type { FileItem } from '../../lib/types';
import { FileIcon } from '../ui/FileIcon';
import { formatDate, formatFileSize, getFileExtension } from '../../lib/utils';

interface FileTableProps {
  files: FileItem[];
  onPreview: (file: FileItem) => void;
  onHistory?: (file: FileItem) => void;
  onComments?: (file: FileItem) => void;
  onNavigateFolder?: (folder: FileItem) => void;
  showSharedBy?: boolean;
  deleted?: boolean;
}

export function FileTable({ files, onPreview, onHistory, onComments, onNavigateFolder, showSharedBy, deleted }: FileTableProps) {
  const [menuFile, setMenuFile] = useState<string | null>(null);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      {/* Header */}
      <div
        className="grid text-xs font-medium px-4 py-2.5 border-b"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--muted-foreground)',
          gridTemplateColumns: showSharedBy ? '1fr 100px 80px 120px 100px 40px' : '1fr 100px 80px 120px 40px',
          background: 'var(--muted)',
        }}
      >
        <span>Name</span>
        {showSharedBy && <span>Shared by</span>}
        <span>Type</span>
        <span>Size</span>
        <span>Modified</span>
        <span />
      </div>

      {files.length === 0 && (
        <div className="py-12 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
          No files here
        </div>
      )}

      {files.map(file => (
        <div
          key={file.id}
          className="grid items-center px-4 py-2.5 border-b last:border-0 group transition-colors cursor-pointer"
          style={{
            borderColor: 'var(--border)',
            gridTemplateColumns: showSharedBy ? '1fr 100px 80px 120px 100px 40px' : '1fr 100px 80px 120px 40px',
            opacity: deleted ? 0.65 : 1,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          onClick={() => {
            if (file.isFolder && onNavigateFolder) onNavigateFolder(file);
            else onPreview(file);
          }}
        >
          {/* Name */}
          <div className="flex items-center gap-3 min-w-0">
            {file.thumbnail && !file.isFolder ? (
              <img src={file.thumbnail} alt={file.name} className="w-8 h-6 rounded object-cover shrink-0" />
            ) : (
              <div className="w-8 h-6 rounded flex items-center justify-center shrink-0" style={{ background: 'var(--muted)' }}>
                <FileIcon type={file.type} size={14} />
              </div>
            )}
            <span className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{file.name}</span>
          </div>

          {/* Shared by */}
          {showSharedBy && (
            <span className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>{file.sharedBy ?? '—'}</span>
          )}

          {/* Type */}
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {file.isFolder ? 'Folder' : getFileExtension(file.name)}
          </span>

          {/* Size */}
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{formatFileSize(file.size)}</span>

          {/* Modified */}
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{formatDate(file.modified)}</span>

          {/* Actions */}
          <div className="relative flex justify-end" onClick={e => e.stopPropagation()}>
            <button
              className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--muted-foreground)' }}
              onClick={() => setMenuFile(menuFile === file.id ? null : file.id)}
            >
              <MoreHorizontal size={15} />
            </button>
            {menuFile === file.id && (
              <div
                className="absolute right-0 top-6 w-44 rounded-lg border shadow-lg z-20 py-1"
                style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
              >
                {!file.isFolder && (
                  <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs transition-colors text-left"
                    style={{ color: 'var(--foreground)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    onClick={() => { onPreview(file); setMenuFile(null); }}>
                    <Eye size={13} /> Preview
                  </button>
                )}
                <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs transition-colors text-left"
                  style={{ color: 'var(--foreground)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  onClick={() => setMenuFile(null)}>
                  <Download size={13} /> Download
                </button>
                {file.versions && onHistory && (
                  <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs transition-colors text-left"
                    style={{ color: 'var(--foreground)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    onClick={() => { onHistory(file); setMenuFile(null); }}>
                    <History size={13} /> Version history
                  </button>
                )}
                {file.comments && onComments && (
                  <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs transition-colors text-left"
                    style={{ color: 'var(--foreground)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    onClick={() => { onComments(file); setMenuFile(null); }}>
                    <MessageSquare size={13} /> Comments
                  </button>
                )}
                <div className="my-1 border-t" style={{ borderColor: 'var(--border)' }} />
                <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs transition-colors text-left"
                  style={{ color: '#EF4444' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  onClick={() => setMenuFile(null)}>
                  <Trash2 size={13} /> {deleted ? 'Delete permanently' : 'Move to trash'}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
