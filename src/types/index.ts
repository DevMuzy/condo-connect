export type Priority = 'BAIXA' | 'MEDIA' | 'ALTA';
export type Status = 'NOVO' | 'EM_ANDAMENTO' | 'FINALIZADO';
export type UserRole = 'admin' | 'sindico' | 'morador';

export interface Condominio {
  id: string;
  nome: string;
  endereco: string;
  sindico_id: string;
  created_at: string;
}

export interface User {
  id: string
  nome: string
  email: string
  password: string
  role: string
  condominio_id: string
  apartamento?: string
  telefone?: string
}

export interface Chamado {
  id: string;
  numero: number;
  condominio_id: string;
  usuario_id: string;
  nome: string;
  apartamento: string;
  email: string;
  telefone: string;
  prioridade: Priority;
  titulo: string;
  descricao: string;
  status: Status;
  responsavel?: string;
  data_abertura: string;
  data_atualizacao: string;
}

export interface HistoricoChamado {
  id: string;
  chamado_id: string;
  campo: string;
  valor_anterior: string;
  valor_novo: string;
  usuario: string;
  data: string;
}

export interface DashboardMetrics {
  abertos: number;
  emAndamento: number;
  finalizados: number;
  urgentes: number;
  total: number;
}
