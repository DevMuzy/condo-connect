import { useApp } from '@/contexts/AppContext';
import { MetricCard } from '@/components/MetricCard';
import { Ticket, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getMetrics } from '@/data/mock';
import { PriorityChart } from '@/components/PriorityChart';
import { StatusChart } from '@/components/StatusChart';
import { RecentTickets } from '@/components/RecentTickets';

export default function Dashboard() {
  const { chamados } = useApp();
  const m = getMetrics(chamados);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold leading-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral dos chamados do condomínio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Abertos" value={m.abertos} icon={Ticket} variant="new" delay={0} />
        <MetricCard title="Em Andamento" value={m.emAndamento} icon={Clock} variant="progress" delay={1} />
        <MetricCard title="Finalizados" value={m.finalizados} icon={CheckCircle2} variant="done" delay={2} />
        <MetricCard title="Urgentes" value={m.urgentes} icon={AlertTriangle} variant="urgent" delay={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PriorityChart chamados={chamados} />
        <StatusChart chamados={chamados} />
      </div>

      <RecentTickets />
    </div>
  );
}
