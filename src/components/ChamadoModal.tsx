import { useState } from 'react';
import { Chamado, Status, Priority } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { Separator } from '@/components/ui/separator';
import { Clock } from 'lucide-react';

interface Props {
  chamado: Chamado;
  onClose: () => void;
}

export function ChamadoModal({ chamado, onClose }: Props) {
  const { updateChamado, historico } = useApp();
  const [status, setStatus] = useState<Status>(chamado.status);
  const [responsavel, setResponsavel] = useState(chamado.responsavel ?? '');
  const [prioridade, setPrioridade] = useState<Priority>(chamado.prioridade);

  const chamadoHistory = historico.filter(h => h.chamado_id === chamado.id).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const handleSave = () => {
    const updates: Partial<Pick<Chamado, 'status' | 'responsavel' | 'prioridade'>> = {};
    if (status !== chamado.status) updates.status = status;
    if (responsavel !== (chamado.responsavel ?? '')) updates.responsavel = responsavel;
    if (prioridade !== chamado.prioridade) updates.prioridade = prioridade;
    if (Object.keys(updates).length > 0) updateChamado(chamado.id, updates);
    onClose();
  };

  const fieldMap: Record<string, string> = { status: 'Status', responsavel: 'Responsável', prioridade: 'Prioridade' };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="tabular-nums">#{chamado.numero}</span>
            <span className="truncate">{chamado.titulo}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div><span className="text-muted-foreground">Nome:</span><p className="font-medium">{chamado.nome}</p></div>
            <div><span className="text-muted-foreground">Apartamento:</span><p className="font-medium">{chamado.apartamento}</p></div>
            <div><span className="text-muted-foreground">Telefone:</span><p className="font-medium tabular-nums">{chamado.telefone}</p></div>
            <div><span className="text-muted-foreground">Email:</span><p className="font-medium truncate">{chamado.email}</p></div>
            <div><span className="text-muted-foreground">Data Abertura:</span><p className="font-medium tabular-nums">{new Date(chamado.data_abertura).toLocaleString('pt-BR')}</p></div>
          </div>

          <div>
            <span className="text-muted-foreground">Descrição:</span>
            <p className="mt-1 bg-muted/50 p-3 rounded-md">{chamado.descricao}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Status</Label>
              <Select value={status} onValueChange={v => setStatus(v as Status)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="NOVO">Novo</SelectItem>
                  <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                  <SelectItem value="FINALIZADO">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Prioridade</Label>
              <Select value={prioridade} onValueChange={v => setPrioridade(v as Priority)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BAIXA">Baixa</SelectItem>
                  <SelectItem value="MEDIA">Média</SelectItem>
                  <SelectItem value="ALTA">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Responsável</Label>
              <Input value={responsavel} onChange={e => setResponsavel(e.target.value)} className="mt-1" placeholder="Nome" />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">Salvar Alterações</Button>

          {/* Histórico */}
          {chamadoHistory.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Histórico
                </h4>
                <div className="space-y-2">
                  {chamadoHistory.map(h => (
                    <div key={h.id} className="flex gap-2 text-xs bg-muted/30 p-2 rounded">
                      <span className="text-muted-foreground tabular-nums whitespace-nowrap">
                        {new Date(h.data).toLocaleString('pt-BR')}
                      </span>
                      <span>
                        <strong>{h.usuario}</strong> alterou <em>{fieldMap[h.campo] ?? h.campo}</em>:{' '}
                        {h.valor_anterior || '(vazio)'} → {h.valor_novo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
