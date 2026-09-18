import { useState, useMemo } from 'react';
import { Upload, ChevronRight, Home, SlidersHorizontal } from 'lucide-react';
import { mockFiles } from '../lib/data';
import type { FileItem } from '../lib/types';
import { FileTable } from '../components/files/FileTable';
import { FilePreview } from '../components/modals/FilePreview';
import { VersionHistory } from '../components/modals/VersionHistory';
import { CommentsPanel } from '../components/modals/CommentsPanel';
import { UploadProgress } from '../components/files/UploadProgress';
import { useApp } from '../context/AppContext';

type SortKey = 'name' | 'modified' | 'size' | 'type';
type FilterKey = 'all' | 'image' | 'pdf' | 'text' | 'video' | 'audio' | 'folder';

export function MyFiles() {
  const { searchQuery } = useApp();
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [filterBy, setFilterBy] = useState<FilterKey>('all');
  const [currentFolder, setCurrentFolder] = useState<FileItem | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<FileItem[]>([]);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [historyFile, setHistoryFile] = useState<FileItem | null>(null);
  const [commentsFile, setCommentsFile] = useState<FileItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const [dragging, setDragging] = useState(false);

  const files = useMemo(() => {
    let list = mockFiles.filter(f => f.parentId === (currentFolder?.id ?? null));
    if (searchQuery) {
      list = mockFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (filterBy !== 'all') list = list.filter(f => f.type === filterBy);
    list.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'modified') return b.modified.getTime() - a.modified.getTime();
      if (sortBy === 'size') return b.size - a.size;
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return 0;
    });
    return list;
  }, [currentFolder, sortBy, filterBy, searchQuery]);

  function navigateFolder(folder: FileItem) {
    setBreadcrumbs(b => [...b, folder]);
    setCurrentFolder(folder);
  }

  function navigateCrumb(index: number) {
    if (index === -1) { setBreadcrumbs([]); setCurrentFolder(null); return; }
    const crumb = breadcrumbs[index];
    setBreadcrumbs(b => b.slice(0, index + 1));
    setCurrentFolder(crumb);
  }

  function triggerUpload() {
    setUploadFileName('photo.zip');
    setUploading(true);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setUploadFileName(e.dataTransfer.files[0].name);
      setUploading(true);
    }
  }

  const selectStyle = {
    background: 'var(--card)',
    borderColor: 'var(--border)',
    color: 'var(--foreground)',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>My Files</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            {searchQuery ? `Search results for "${searchQuery}"` : 'Manage your files and folders'}
          </p>
        </div>
        <button
          onClick={triggerUpload}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Upload size={15} />
          Upload
        </button>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center gap-1 text-sm">
          <button onClick={() => navigateCrumb(-1)} className="flex items-center gap-1 transition-colors" style={{ color: 'var(--muted-foreground)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--primary)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)'}>
            <Home size={14} />
            My Files
          </button>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.id} className="flex items-center gap-1">
              <ChevronRight size={14} style={{ color: 'var(--border)' }} />
              <button
                onClick={() => navigateCrumb(i)}
                className="transition-colors"
                style={{ color: i === breadcrumbs.length - 1 ? 'var(--foreground)' : 'var(--muted-foreground)', fontWeight: i === breadcrumbs.length - 1 ? 500 : 400 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--primary)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = i === breadcrumbs.length - 1 ? 'var(--foreground)' : 'var(--muted-foreground)'}
              >
                {crumb.name}
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <div
        className="border-2 border-dashed rounded-xl p-6 text-center transition-colors"
        style={{ borderColor: dragging ? 'var(--primary)' : 'var(--border)', background: dragging ? 'rgba(79,70,229,0.04)' : 'transparent' }}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <Upload size={22} className="mx-auto mb-2" style={{ color: 'var(--muted-foreground)' }} />
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>Drag & Drop files here</p>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>or{' '}
          <button onClick={triggerUpload} className="font-medium underline" style={{ color: 'var(--primary)' }}>Upload files</button>
        </p>
      </div>

      {/* Sort / Filter */}
      <div className="flex items-center gap-3">
        <SlidersHorizontal size={14} style={{ color: 'var(--muted-foreground)' }} />
        <div className="flex items-center gap-2 text-sm">
          <label style={{ color: 'var(--muted-foreground)' }}>Sort by:</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)}
            className="px-2.5 py-1.5 text-sm rounded-lg border outline-none cursor-pointer"
            style={selectStyle}>
            <option value="name">Name</option>
            <option value="modified">Date</option>
            <option value="size">Size</option>
            <option value="type">Type</option>
          </select>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label style={{ color: 'var(--muted-foreground)' }}>Filter:</label>
          <select value={filterBy} onChange={e => setFilterBy(e.target.value as FilterKey)}
            className="px-2.5 py-1.5 text-sm rounded-lg border outline-none cursor-pointer"
            style={selectStyle}>
            <option value="all">All files</option>
            <option value="image">Images</option>
            <option value="pdf">PDFs</option>
            <option value="text">Text</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="folder">Folders</option>
          </select>
        </div>
      </div>

      {/* File table */}
      <FileTable
        files={files}
        onPreview={setPreviewFile}
        onHistory={setHistoryFile}
        onComments={setCommentsFile}
        onNavigateFolder={navigateFolder}
      />

      {/* Modals */}
      {previewFile && (
        <FilePreview file={previewFile} onClose={() => setPreviewFile(null)}
          onShowHistory={() => { setHistoryFile(previewFile); setPreviewFile(null); }}
          onShowComments={() => { setCommentsFile(previewFile); setPreviewFile(null); }}
        />
      )}
      {historyFile && <VersionHistory file={historyFile} onClose={() => setHistoryFile(null)} />}
      {commentsFile && <CommentsPanel file={commentsFile} onClose={() => setCommentsFile(null)} />}
      {uploading && <UploadProgress fileName={uploadFileName} onDone={() => setUploading(false)} />}
    </div>
  );
}
