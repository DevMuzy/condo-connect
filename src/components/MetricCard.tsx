import { LucideIcon } from 'lucide-react';

const variants = {
  new: 'border-l-status-new',
  progress: 'border-l-status-in-progress',
  done: 'border-l-status-done',
  urgent: 'border-l-priority-high',
} as const;

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: keyof typeof variants;
  delay: number;
}

export function MetricCard({ title, value, icon: Icon, variant, delay }: MetricCardProps) {
  return (
    <div
      className={`bg-card rounded-lg border-l-4 ${variants[variant]} p-5 shadow-sm animate-slide-up`}
      style={{ animationDelay: `${delay * 80}ms` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold mt-1 tabular-nums">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
