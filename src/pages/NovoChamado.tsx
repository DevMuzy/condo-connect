import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Priority } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2, CheckCircle2 } from 'lucide-react';

export default function NovoChamado() {
  const { addChamado } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: '', apartamento: '', email: '', telefone: '',
    prioridade: 'MEDIA' as Priority, titulo: '', descricao: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    addChamado({ ...form, condominio_id: '1', usuario_id: '' });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center animate-scale-in">
          <CardContent className="pt-8 pb-8 space-y-4">
            <div className="h-16 w-16 rounded-full bg-status-done/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-status-done" />
            </div>
            <h2 className="text-xl font-bold">Chamado enviado!</h2>
            <p className="text-sm text-muted-foreground">Seu chamado foi registrado com sucesso. Acompanhe o andamento pelo seu email.</p>
            <Button onClick={() => { setSubmitted(false); setForm({ nome: '', apartamento: '', email: '', telefone: '', prioridade: 'MEDIA', titulo: '', descricao: '' }); }}>
              Abrir novo chamado
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg animate-slide-up">
        <CardHeader className="text-center">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-2">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">Abrir Chamado</CardTitle>
          <CardDescription>Preencha os dados abaixo para registrar sua solicitação</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome" className="text-xs">Nome</Label>
                <Input id="nome" required value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="apto" className="text-xs">Apartamento</Label>
                <Input id="apto" required value={form.apartamento} onChange={e => setForm(f => ({ ...f, apartamento: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs">Email</Label>
                <Input id="email" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="tel" className="text-xs">Telefone</Label>
                <Input id="tel" required value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label className="text-xs">Prioridade</Label>
              <Select value={form.prioridade} onValueChange={v => setForm(f => ({ ...f, prioridade: v as Priority }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BAIXA">🟢 Baixa</SelectItem>
                  <SelectItem value="MEDIA">🟡 Média</SelectItem>
                  <SelectItem value="ALTA">🔴 Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="titulo" className="text-xs">Título do Problema</Label>
              <Input id="titulo" required value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="desc" className="text-xs">Descrição</Label>
              <Textarea id="desc" required rows={4} value={form.descricao} onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Chamado'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
