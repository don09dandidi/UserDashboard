import { FileText, Image, Film, Music, Folder, File, FileType } from 'lucide-react';
import type { FileType as FType } from '../../lib/types';

interface FileIconProps {
  type: FType;
  size?: number;
  className?: string;
}

const colors: Record<FType, string> = {
  image: 'text-violet-500',
  pdf: 'text-red-500',
  text: 'text-blue-500',
  video: 'text-orange-500',
  audio: 'text-pink-500',
  folder: 'text-yellow-500',
  other: 'text-slate-400',
};

const icons: Record<FType, React.ComponentType<{ size?: number; className?: string }>> = {
  image: Image,
  pdf: FileType,
  text: FileText,
  video: Film,
  audio: Music,
  folder: Folder,
  other: File,
};

export function FileIcon({ type, size = 18, className = '' }: FileIconProps) {
  const Icon = icons[type];
  return <Icon size={size} className={`${colors[type]} ${className}`} />;
}
