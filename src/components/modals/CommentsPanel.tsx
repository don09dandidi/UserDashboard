import { useState } from 'react';
import { X, Send } from 'lucide-react';
import type { FileItem } from '../../lib/types';
import { formatDateTime } from '../../lib/utils';

interface CommentsPanelProps {
  file: FileItem;
  onClose: () => void;
}

export function CommentsPanel({ file, onClose }: CommentsPanelProps) {
  const [comments, setComments] = useState(file.comments ?? []);
  const [text, setText] = useState('');

  function addComment() {
    if (!text.trim()) return;
    setComments(c => [...c, { id: Date.now().toString(), user: 'Alex Morgan', avatar: 'AM', text, date: new Date() }]);
    setText('');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-xl border shadow-xl overflow-hidden flex flex-col"
        style={{ background: 'var(--card)', borderColor: 'var(--border)', maxHeight: '80vh' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
          <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Comments</span>
          <button onClick={onClose} className="p-1 rounded" style={{ color: 'var(--muted-foreground)' }}><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 && (
            <p className="text-xs text-center py-4" style={{ color: 'var(--muted-foreground)' }}>No comments yet</p>
          )}
          {comments.map((c, i) => (
            <div key={c.id}>
              {i > 0 && <div className="border-t mb-4" style={{ borderColor: 'var(--border)' }} />}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                  style={{ background: 'var(--primary)', color: 'white' }}>
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>{c.user}</span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{formatDateTime(c.date)}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>{c.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4 shrink-0">
          <div className="flex gap-2">
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addComment()}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 text-sm rounded-lg border outline-none"
              style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button onClick={addComment} className="p-2 rounded-lg" style={{ background: 'var(--primary)', color: 'white' }}>
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
