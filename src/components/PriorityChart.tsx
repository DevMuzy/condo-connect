import { Chamado } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['hsl(142,71%,40%)', 'hsl(45,93%,47%)', 'hsl(0,72%,51%)'];

export function PriorityChart({ chamados }: { chamados: Chamado[] }) {
  const data = [
    { name: 'Baixa', value: chamados.filter(c => c.prioridade === 'BAIXA').length },
    { name: 'Média', value: chamados.filter(c => c.prioridade === 'MEDIA').length },
    { name: 'Alta', value: chamados.filter(c => c.prioridade === 'ALTA').length },
  ].filter(d => d.value > 0);

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '320ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Chamados por Prioridade</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
