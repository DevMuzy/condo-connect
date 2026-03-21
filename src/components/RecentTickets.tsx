import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { useNavigate } from 'react-router-dom';

export function RecentTickets() {
  const { chamados } = useApp();
  const navigate = useNavigate();
  const recent = chamados.slice(0, 5);

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '480ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Chamados Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground text-xs">
                <th className="text-left py-2 px-4 font-medium">Nº</th>
                <th className="text-left py-2 px-4 font-medium">Título</th>
                <th className="text-left py-2 px-4 font-medium hidden md:table-cell">Apto</th>
                <th className="text-left py-2 px-4 font-medium">Prioridade</th>
                <th className="text-left py-2 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(c => (
                <tr
                  key={c.id}
                  className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => navigate('/admin/chamados')}
                >
                  <td className="py-2.5 px-4 tabular-nums font-medium">#{c.numero}</td>
                  <td className="py-2.5 px-4 truncate max-w-[200px]">{c.titulo}</td>
                  <td className="py-2.5 px-4 hidden md:table-cell">{c.apartamento}</td>
                  <td className="py-2.5 px-4"><PriorityBadge priority={c.prioridade} /></td>
                  <td className="py-2.5 px-4"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
