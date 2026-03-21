import { Priority } from '@/types';
import { Badge } from '@/components/ui/badge';

const config: Record<Priority, { label: string; className: string }> = {
  BAIXA: { label: 'Baixa', className: 'priority-low' },
  MEDIA: { label: 'Média', className: 'priority-medium' },
  ALTA: { label: 'Alta', className: 'priority-high' },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const c = config[priority];
  return <Badge variant="outline" className={`${c.className} border-0 text-[11px] font-semibold`}>{c.label}</Badge>;
}
