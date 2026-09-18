import { HardDrive } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockFiles, storageByType, storageTotal, storageUsed } from '../lib/data';
import { formatDate, formatFileSize } from '../lib/utils';
import { FileIcon } from '../components/ui/FileIcon';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border p-5 ${className}`} style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      {children}
    </div>
  );
}

const RADIAN = Math.PI / 180;
function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
  if (percent < 0.07) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function Dashboard() {
  const recentFiles = [...mockFiles].filter(f => !f.isFolder).sort((a, b) => b.modified.getTime() - a.modified.getTime()).slice(0, 5);
  const usedPercent = (storageUsed / storageTotal) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Overview of your cloud storage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Storage card */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(79,70,229,0.1)' }}>
              <HardDrive size={18} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Storage</div>
              <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Total capacity</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--foreground)' }}>
                <span className="text-2xl font-bold">{storageUsed}</span>
                <span className="text-sm font-normal ml-1" style={{ color: 'var(--muted-foreground)' }}>GB of {storageTotal} GB used</span>
              </span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${usedPercent}%`, background: 'var(--primary)' }}
              />
            </div>
            <div className="flex justify-between text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <span>{storageUsed} GB used</span>
              <span>{storageTotal - storageUsed} GB available</span>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <Card>
          <div className="text-sm font-medium mb-4" style={{ color: 'var(--foreground)' }}>Storage by type</div>
          <div className="flex items-center gap-4">
            <div style={{ width: 130, height: 130 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={storageByType} dataKey="value" cx="50%" cy="50%" outerRadius={60} labelLine={false} label={CustomLabel}>
                    {storageByType.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v} GB`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {storageByType.map(item => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
                    <span style={{ color: 'var(--muted-foreground)' }}>{item.name}</span>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--foreground)' }}>{item.value} GB</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent files */}
      <Card>
        <div className="text-sm font-medium mb-4" style={{ color: 'var(--foreground)' }}>Recent files</div>
        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {recentFiles.map(file => (
            <div key={file.id} className="flex items-center gap-3 py-2.5 group">
              {file.thumbnail ? (
                <img src={file.thumbnail} alt={file.name} className="w-10 h-7 rounded object-cover shrink-0" />
              ) : (
                <div className="w-10 h-7 rounded flex items-center justify-center shrink-0" style={{ background: 'var(--muted)' }}>
                  <FileIcon type={file.type} size={16} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{file.name}</div>
              </div>
              <div className="hidden sm:flex items-center gap-8 text-xs shrink-0" style={{ color: 'var(--muted-foreground)' }}>
                <span className="w-16 text-right">{formatFileSize(file.size)}</span>
                <span className="w-20 text-right">{formatDate(file.modified)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
