import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { ChamadoModal } from '@/components/ChamadoModal';
import { Chamado, Status, Priority } from '@/types';
import { Search, Trash2 } from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const PAGE_SIZE = 8;

export default function ChamadosPage() {
  const { chamados, searchTerm, setSearchTerm, filterStatus, setFilterStatus, filterPriority, setFilterPriority, deleteChamado } = useApp();
  const [page, setPage] = useState(1);
  const [selectedChamado, setSelectedChamado] = useState<Chamado | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = chamados.filter(c => {
    const matchSearch = searchTerm === '' ||
      c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.apartamento.includes(searchTerm) ||
      String(c.numero).includes(searchTerm);
    const matchStatus = filterStatus === 'TODOS' || c.status === filterStatus;
    const matchPriority = filterPriority === 'TODOS' || c.prioridade === filterPriority;
    return matchSearch && matchStatus && matchPriority;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Chamados</h1>
        <p className="text-sm text-muted-foreground mt-1">Gerencie todos os chamados do condomínio</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar chamado..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={v => { setFilterStatus(v as Status | 'TODOS'); setPage(1); }}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todos Status</SelectItem>
            <SelectItem value="NOVO">Novo</SelectItem>
            <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
            <SelectItem value="FINALIZADO">Finalizado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={v => { setFilterPriority(v as Priority | 'TODOS'); setPage(1); }}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todas Prioridades</SelectItem>
            <SelectItem value="BAIXA">Baixa</SelectItem>
            <SelectItem value="MEDIA">Média</SelectItem>
            <SelectItem value="ALTA">Alta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground text-xs">
                <th className="text-left py-3 px-4 font-medium">Nº</th>
                <th className="text-left py-3 px-4 font-medium">Nome</th>
                <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Apto</th>
                <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Telefone</th>
                <th className="text-left py-3 px-4 font-medium">Título</th>
                <th className="text-left py-3 px-4 font-medium">Prioridade</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Responsável</th>
                <th className="text-left py-3 px-4 font-medium hidden xl:table-cell">Data</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c, i) => (
                <tr
                  key={c.id}
                  className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms` }}
                  onClick={() => setSelectedChamado(c)}
                >
                  <td className="py-3 px-4 tabular-nums font-semibold">#{c.numero}</td>
                  <td className="py-3 px-4">{c.nome}</td>
                  <td className="py-3 px-4 hidden md:table-cell">{c.apartamento}</td>
                  <td className="py-3 px-4 hidden lg:table-cell tabular-nums">{c.telefone}</td>
                  <td className="py-3 px-4 truncate max-w-[180px]">{c.titulo}</td>
                  <td className="py-3 px-4"><PriorityBadge priority={c.prioridade} /></td>
                  <td className="py-3 px-4"><StatusBadge status={c.status} /></td>
                  <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{c.responsavel || '—'}</td>
                  <td className="py-3 px-4 hidden xl:table-cell text-muted-foreground tabular-nums">
                    {new Date(c.data_abertura).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={e => { e.stopPropagation(); setDeleteId(c.id); }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={10} className="py-12 text-center text-muted-foreground">Nenhum chamado encontrado</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-xs text-muted-foreground">{filtered.length} chamado(s)</p>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i} variant={page === i + 1 ? 'default' : 'ghost'} size="sm"
                  className="h-7 w-7 p-0 text-xs"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedChamado && (
        <ChamadoModal chamado={selectedChamado} onClose={() => setSelectedChamado(null)} />
      )}

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir chamado?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) deleteChamado(deleteId); setDeleteId(null); }}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
