import { Chamado } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const COLORS = ['hsl(213,94%,52%)', 'hsl(25,95%,53%)', 'hsl(142,71%,40%)'];

export function StatusChart({ chamados }: { chamados: Chamado[] }) {
  const data = [
    { name: 'Novo', value: chamados.filter(c => c.status === 'NOVO').length },
    { name: 'Em Andamento', value: chamados.filter(c => c.status === 'EM_ANDAMENTO').length },
    { name: 'Finalizado', value: chamados.filter(c => c.status === 'FINALIZADO').length },
  ];

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '400ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Chamados por Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
