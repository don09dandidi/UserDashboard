import { X, Download, MessageSquare, History } from 'lucide-react';
import type { FileItem } from '../../lib/types';
import { FileIcon } from '../ui/FileIcon';
import { formatFileSize, formatDate, formatDateTime } from '../../lib/utils';

interface FilePreviewProps {
  file: FileItem;
  onClose: () => void;
  onShowHistory: () => void;
  onShowComments: () => void;
}

export function FilePreview({ file, onClose, onShowHistory, onShowComments }: FilePreviewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-xl border shadow-xl overflow-hidden"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b" style={{ borderColor: 'var(--border)' }}>
          <FileIcon type={file.type} size={18} />
          <span className="text-sm font-medium flex-1 truncate" style={{ color: 'var(--foreground)' }}>{file.name}</span>
          <div className="flex items-center gap-1">
            {file.comments && (
              <button onClick={onShowComments} className="p-1.5 rounded-lg transition-all" title="Comments"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <MessageSquare size={16} />
              </button>
            )}
            {file.versions && (
              <button onClick={onShowHistory} className="p-1.5 rounded-lg transition-all" title="Version history"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <History size={16} />
              </button>
            )}
            <button className="p-1.5 rounded-lg transition-all" title="Download"
              style={{ color: 'var(--muted-foreground)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <Download size={16} />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg transition-all ml-1"
              style={{ color: 'var(--muted-foreground)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--muted)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Preview area */}
        <div className="p-6 min-h-64 flex items-center justify-center" style={{ background: 'var(--background)' }}>
          {file.type === 'image' && file.thumbnail ? (
            <img src={file.thumbnail.replace('w=120&h=80', 'w=600&h=400')} alt={file.name}
              className="max-w-full max-h-80 rounded-lg object-contain" />
          ) : file.type === 'pdf' ? (
            <div className="w-full max-w-md p-8 rounded-lg border text-center" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <FileIcon type="pdf" size={48} className="mx-auto mb-3" />
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>{file.name}</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>PDF document · {formatFileSize(file.size)}</p>
              <div className="mt-4 p-4 rounded-lg text-left text-xs leading-relaxed" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                This document contains Q3 financial results and projections. Click download to open in your PDF viewer.
              </div>
            </div>
          ) : file.type === 'text' ? (
            <div className="w-full max-w-md p-5 rounded-lg border font-mono text-sm leading-relaxed" style={{ borderColor: 'var(--border)', background: 'var(--card)', color: 'var(--foreground)' }}>
              <p className="text-xs font-sans mb-3" style={{ color: 'var(--muted-foreground)' }}>Meeting Notes — September 18, 2026</p>
              <p className="mb-2">Attendees: Alex, Jordan, Sam, Chris</p>
              <p className="mb-2">Action items:</p>
              <p>- Review Q3 report before Friday</p>
              <p>- Schedule client presentation</p>
              <p>- Update project timeline</p>
            </div>
          ) : (
            <div className="text-center">
              <FileIcon type={file.type} size={56} className="mx-auto mb-3" />
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>{file.name}</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Preview not available for this file type</p>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex gap-6 px-5 py-3 border-t text-xs" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
          <span>{formatFileSize(file.size)}</span>
          <span>Modified {formatDate(file.modified)}</span>
        </div>
      </div>
    </div>
  );
}
