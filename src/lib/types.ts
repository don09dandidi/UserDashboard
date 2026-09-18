export type FileType = 'image' | 'pdf' | 'text' | 'video' | 'audio' | 'folder' | 'other';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number;
  modified: Date;
  isFolder?: boolean;
  parentId?: string | null;
  thumbnail?: string;
  versions?: FileVersion[];
  comments?: Comment[];
  sharedBy?: string;
  deleted?: boolean;
}

export interface FileVersion {
  version: number;
  date: Date;
  size: number;
  isCurrent?: boolean;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  date: Date;
}

export interface Notification {
  id: string;
  type: 'share' | 'comment' | 'storage';
  text: string;
  date: Date;
  read: boolean;
  icon: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}
