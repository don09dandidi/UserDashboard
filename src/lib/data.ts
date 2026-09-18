import type { FileItem, Notification, User } from './types';

export const currentUser: User = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  avatar: 'AM',
};

export const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Projects',
    type: 'folder',
    size: 0,
    modified: new Date('2026-09-15'),
    isFolder: true,
    parentId: null,
  },
  {
    id: '2',
    name: 'Design Assets',
    type: 'folder',
    size: 0,
    modified: new Date('2026-09-14'),
    isFolder: true,
    parentId: null,
  },
  {
    id: '3',
    name: 'Q3 Report Final.pdf',
    type: 'pdf',
    size: 2.4 * 1024 * 1024,
    modified: new Date('2026-09-18'),
    parentId: null,
    versions: [
      { version: 3, date: new Date('2026-09-18'), size: 2.4 * 1024 * 1024, isCurrent: true },
      { version: 2, date: new Date('2026-09-16'), size: 2.1 * 1024 * 1024 },
      { version: 1, date: new Date('2026-09-14'), size: 1.8 * 1024 * 1024 },
    ],
    comments: [
      { id: 'c1', user: 'Jordan Lee', avatar: 'JL', text: 'Great work on the financials section!', date: new Date('2026-09-18') },
      { id: 'c2', user: 'Sam Rivera', avatar: 'SR', text: 'Can we update the projections on page 12?', date: new Date('2026-09-17') },
    ],
  },
  {
    id: '4',
    name: 'team-photo.jpg',
    type: 'image',
    size: 1.8 * 1024 * 1024,
    modified: new Date('2026-09-17'),
    parentId: null,
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&h=80&fit=crop&auto=format',
  },
  {
    id: '5',
    name: 'meeting-notes.txt',
    type: 'text',
    size: 12 * 1024,
    modified: new Date('2026-09-17'),
    parentId: null,
  },
  {
    id: '6',
    name: 'product-demo.mp4',
    type: 'video',
    size: 48.2 * 1024 * 1024,
    modified: new Date('2026-09-16'),
    parentId: null,
  },
  {
    id: '7',
    name: 'podcast-ep12.mp3',
    type: 'audio',
    size: 22.5 * 1024 * 1024,
    modified: new Date('2026-09-15'),
    parentId: null,
  },
  {
    id: '8',
    name: 'PBL',
    type: 'folder',
    size: 0,
    modified: new Date('2026-09-13'),
    isFolder: true,
    parentId: '1',
  },
  {
    id: '9',
    name: 'hero-banner.png',
    type: 'image',
    size: 3.1 * 1024 * 1024,
    modified: new Date('2026-09-12'),
    parentId: '2',
    thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=120&h=80&fit=crop&auto=format',
  },
];

export const sharedFiles: FileItem[] = [
  {
    id: 's1',
    name: 'Brand Guidelines 2026.pdf',
    type: 'pdf',
    size: 5.6 * 1024 * 1024,
    modified: new Date('2026-09-16'),
    parentId: null,
    sharedBy: 'Jordan Lee',
  },
  {
    id: 's2',
    name: 'Marketing Assets',
    type: 'folder',
    size: 0,
    modified: new Date('2026-09-14'),
    isFolder: true,
    parentId: null,
    sharedBy: 'Sam Rivera',
  },
  {
    id: 's3',
    name: 'launch-plan.xlsx',
    type: 'other',
    size: 890 * 1024,
    modified: new Date('2026-09-13'),
    parentId: null,
    sharedBy: 'Chris Park',
  },
];

export const deletedFiles: FileItem[] = [
  {
    id: 'd1',
    name: 'old-backup.zip',
    type: 'other',
    size: 124 * 1024 * 1024,
    modified: new Date('2026-09-10'),
    parentId: null,
    deleted: true,
  },
  {
    id: 'd2',
    name: 'draft-proposal.pdf',
    type: 'pdf',
    size: 1.2 * 1024 * 1024,
    modified: new Date('2026-09-08'),
    parentId: null,
    deleted: true,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'share',
    text: 'Jordan Lee shared "Brand Guidelines 2026.pdf" with you',
    date: new Date('2026-09-18T09:00:00'),
    read: false,
    icon: 'share',
  },
  {
    id: 'n2',
    type: 'comment',
    text: 'Sam Rivera commented on "Q3 Report Final.pdf"',
    date: new Date('2026-09-17T15:30:00'),
    read: false,
    icon: 'message',
  },
  {
    id: 'n3',
    type: 'storage',
    text: 'You\'ve used 68% of your storage. Consider upgrading your plan.',
    date: new Date('2026-09-17T08:00:00'),
    read: true,
    icon: 'cloud',
  },
  {
    id: 'n4',
    type: 'share',
    text: 'Chris Park shared "launch-plan.xlsx" with you',
    date: new Date('2026-09-15T11:20:00'),
    read: true,
    icon: 'share',
  },
  {
    id: 'n5',
    type: 'comment',
    text: 'Jordan Lee commented on "team-photo.jpg"',
    date: new Date('2026-09-14T16:45:00'),
    read: true,
    icon: 'message',
  },
];

export const storageUsed = 68;
export const storageTotal = 100;

export const storageByType = [
  { name: 'Images', value: 22, color: '#4F46E5' },
  { name: 'Documents', value: 15, color: '#06B6D4' },
  { name: 'Videos', value: 18, color: '#8B5CF6' },
  { name: 'Audio', value: 7, color: '#EC4899' },
  { name: 'Other', value: 6, color: '#F59E0B' },
];
