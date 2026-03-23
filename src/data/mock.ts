import { Chamado, HistoricoChamado, DashboardMetrics, Condominio, User } from '@/types';

export const mockCondominios: Condominio[] = [
  { id: '1', nome: 'Residencial Aurora', endereco: 'Rua das Flores, 120 - São Paulo, SP', sindico_id: '2', created_at: '2024-01-15' },
  { id: '2', nome: 'Edifício Monte Verde', endereco: 'Av. Brasil, 450 - Rio de Janeiro, RJ', sindico_id: '3', created_at: '2024-02-20' },
];

export const mockUsers: User[] = [

{ id: '1', nome: 'Admin Almeida', email: 'admin@edalmeida.com', password: 'almeidaadmin', role: 'admin', condominio_id: '1' }
];

let nextNum = 7;

export function getNextNumero() {
  nextNum += 1;
  return nextNum;
}



/// Dados mockados na tela de admin 
export const mockChamados: Chamado[] = [
  { id: '1', numero: 1, condominio_id: '1', usuario_id: '3', nome: 'Rafael Mendes', apartamento: '101', email: 'rafael@email.com', telefone: '11987654321', prioridade: 'ALTA', titulo: 'Vazamento no teto do banheiro', descricao: 'Água pingando do teto do banheiro desde ontem à noite. Parece vir do apartamento de cima.', status: 'NOVO', data_abertura: '2025-03-20T10:30:00', data_atualizacao: '2025-03-20T10:30:00' },
  { id: '2', numero: 2, condominio_id: '1', usuario_id: '3', nome: 'Ana Souza', apartamento: '305', email: 'ana@email.com', telefone: '11976543210', prioridade: 'MEDIA', titulo: 'Interfone não funciona', descricao: 'O interfone do apartamento parou de funcionar há 3 dias.', status: 'EM_ANDAMENTO', responsavel: 'Manutenção Predial', data_abertura: '2025-03-18T14:00:00', data_atualizacao: '2025-03-19T09:00:00' },
  { id: '3', numero: 3, condominio_id: '1', usuario_id: '3', nome: 'Pedro Lima', apartamento: '502', email: 'pedro@email.com', telefone: '11965432109', prioridade: 'BAIXA', titulo: 'Lâmpada queimada no corredor', descricao: 'A lâmpada do corredor do 5º andar está queimada.', status: 'FINALIZADO', responsavel: 'Zelador', data_abertura: '2025-03-15T08:00:00', data_atualizacao: '2025-03-16T11:00:00' },
  { id: '4', numero: 4, condominio_id: '1', usuario_id: '3', nome: 'Lucia Ferreira', apartamento: '203', email: 'lucia@email.com', telefone: '11954321098', prioridade: 'ALTA', titulo: 'Elevador parado', descricao: 'O elevador social está parado desde hoje de manhã. Urgente pois temos idosos no prédio.', status: 'EM_ANDAMENTO', responsavel: 'Técnico Elevadores', data_abertura: '2025-03-20T07:00:00', data_atualizacao: '2025-03-20T08:30:00' },
  { id: '5', numero: 5, condominio_id: '1', usuario_id: '3', nome: 'Marcos Oliveira', apartamento: '401', email: 'marcos@email.com', telefone: '11943210987', prioridade: 'MEDIA', titulo: 'Barulho excessivo apto 402', descricao: 'O apartamento 402 faz barulho excessivo após as 22h todos os dias.', status: 'NOVO', data_abertura: '2025-03-19T22:00:00', data_atualizacao: '2025-03-19T22:00:00' },
  { id: '6', numero: 6, condominio_id: '1', usuario_id: '3', nome: 'Carla Santos', apartamento: '102', email: 'carla@email.com', telefone: '11932109876', prioridade: 'BAIXA', titulo: 'Pintura descascando na garagem', descricao: 'A pintura na vaga 15 da garagem está descascando.', status: 'FINALIZADO', responsavel: 'Pintor', data_abertura: '2025-03-10T10:00:00', data_atualizacao: '2025-03-14T16:00:00' },
  { id: '7', numero: 7, condominio_id: '1', usuario_id: '3', nome: 'Felipe Rocha', apartamento: '601', email: 'felipe@email.com', telefone: '11921098765', prioridade: 'ALTA', titulo: 'Porta do hall não tranca', descricao: 'A porta de entrada do hall não está trancando corretamente. Problema de segurança.', status: 'NOVO', data_abertura: '2025-03-20T16:00:00', data_atualizacao: '2025-03-20T16:00:00' },
];

export const mockHistorico: HistoricoChamado[] = [
  { id: '1', chamado_id: '2', campo: 'status', valor_anterior: 'NOVO', valor_novo: 'EM_ANDAMENTO', usuario: 'Maria Síndica', data: '2025-03-19T09:00:00' },
  { id: '2', chamado_id: '2', campo: 'responsavel', valor_anterior: '', valor_novo: 'Manutenção Predial', usuario: 'Maria Síndica', data: '2025-03-19T09:00:00' },
  { id: '3', chamado_id: '4', campo: 'status', valor_anterior: 'NOVO', valor_novo: 'EM_ANDAMENTO', usuario: 'Maria Síndica', data: '2025-03-20T08:30:00' },
  { id: '4', chamado_id: '4', campo: 'responsavel', valor_anterior: '', valor_novo: 'Técnico Elevadores', usuario: 'Maria Síndica', data: '2025-03-20T08:30:00' },
];

export function getMetrics(chamados: Chamado[]): DashboardMetrics {
  return {
    abertos: chamados.filter(c => c.status === 'NOVO').length,
    emAndamento: chamados.filter(c => c.status === 'EM_ANDAMENTO').length,
    finalizados: chamados.filter(c => c.status === 'FINALIZADO').length,
    urgentes: chamados.filter(c => c.prioridade === 'ALTA' && c.status !== 'FINALIZADO').length,
    total: chamados.length,
  };
}
