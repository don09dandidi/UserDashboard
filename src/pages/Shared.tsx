import { useState } from 'react';
import { sharedFiles } from '../lib/data';
import type { FileItem } from '../lib/types';
import { FileTable } from '../components/files/FileTable';
import { FilePreview } from '../components/modals/FilePreview';
import { VersionHistory } from '../components/modals/VersionHistory';
import { CommentsPanel } from '../components/modals/CommentsPanel';

export function Shared() {
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [historyFile, setHistoryFile] = useState<FileItem | null>(null);
  const [commentsFile, setCommentsFile] = useState<FileItem | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Shared with me</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Files and folders shared by others</p>
      </div>

      <FileTable
        files={sharedFiles}
        onPreview={setPreviewFile}
        onHistory={setHistoryFile}
        onComments={setCommentsFile}
        showSharedBy
      />

      {previewFile && (
        <FilePreview file={previewFile} onClose={() => setPreviewFile(null)}
          onShowHistory={() => { setHistoryFile(previewFile); setPreviewFile(null); }}
          onShowComments={() => { setCommentsFile(previewFile); setPreviewFile(null); }}
        />
      )}
      {historyFile && <VersionHistory file={historyFile} onClose={() => setHistoryFile(null)} />}
      {commentsFile && <CommentsPanel file={commentsFile} onClose={() => setCommentsFile(null)} />}
    </div>
  );
}
