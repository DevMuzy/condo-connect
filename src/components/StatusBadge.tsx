import { Status } from '@/types';
import { Badge } from '@/components/ui/badge';

const config: Record<Status, { label: string; className: string }> = {
  NOVO: { label: 'Novo', className: 'status-new' },
  EM_ANDAMENTO: { label: 'Em Andamento', className: 'status-in-progress' },
  FINALIZADO: { label: 'Finalizado', className: 'status-done' },
};

export function StatusBadge({ status }: { status: Status }) {
  const c = config[status];
  return <Badge variant="outline" className={`${c.className} border-0 text-[11px] font-semibold`}>{c.label}</Badge>;
}
