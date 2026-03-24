import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Chamado, HistoricoChamado, User, Priority, Status } from '@/types';
import { mockChamados, mockHistorico, mockUsers, getNextNumero } from '@/data/mock';
import { toast } from 'sonner';

interface AppContextType {
  user: User | null;
  chamados: Chamado[];
  historico: HistoricoChamado[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addChamado: (chamado: Omit<Chamado, 'id' | 'numero' | 'status' | 'data_abertura' | 'data_atualizacao'>) => void;
  updateChamado: (id: string, updates: Partial<Pick<Chamado, 'status' | 'responsavel' | 'prioridade'>>) => void;
  deleteChamado: (id: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: Status | 'TODOS';
  setFilterStatus: (s: Status | 'TODOS') => void;
  filterPriority: Priority | 'TODOS';
  setFilterPriority: (p: Priority | 'TODOS') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [chamados, setChamados] = useState<Chamado[]>(mockChamados);
  const [historico, setHistorico] = useState<HistoricoChamado[]>(mockHistorico);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | 'TODOS'>('TODOS');
  const [filterPriority, setFilterPriority] = useState<Priority | 'TODOS'>('TODOS');

  // 🔄 BUSCA CHAMADOS DO N8N AUTOMATICAMENTE
  useEffect(() => {

    const carregarChamados = async () => {

      try {

        const response = await fetch("https://muzyautomacao.app.n8n.cloud/webhook-test/chamados");

        const data = await response.json();

        console.log("Chamados recebidos:", data);

        const lista = Array.isArray(data)
          ? data
          : data?.data || data?.rows || [];

        const chamadosFormatados: Chamado[] = lista.map((c: any) => ({

          id: c.id || crypto.randomUUID(),

          numero: Number(c.numero) || 0,

          condominio_id: Number(c.condominio_id) || 1,

          nome: c.nome || "",
          apartamento: c.apartamento || "",
          email: c.email || "",
          telefone: c.telefone || "",

          titulo: c.titulo || "",
          descricao: c.descricao || "",

          prioridade: c.prioridade || "BAIXA",
          status: c.status || "NOVO",

          responsavel: c.responsavel || "",

          data_abertura: c.data_abertura || new Date().toISOString(),
          data_atualizacao: c.data_atualizacao || new Date().toISOString()

        }));

        setChamados(chamadosFormatados);

      } catch (error) {

        console.log("Erro ao buscar chamados:", error);

      }

    };

    carregarChamados();

    const interval = setInterval(carregarChamados, 5000);

    return () => clearInterval(interval);

  }, []);

  const login = useCallback((email: string, password: string) => {

    const found = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (found) {

      setUser(found);

      toast.success(`Bem-vindo, ${found.nome}!`);

      return true;

    }

    toast.error('Credenciais inválidas');

    return false;

  }, []);

  const logout = useCallback(() => {

    setUser(null);

    toast.info('Você saiu do sistema');

  }, []);

  const addChamado = useCallback((data: Omit<Chamado, 'id' | 'numero' | 'status' | 'data_abertura' | 'data_atualizacao'>) => {

    const now = new Date().toISOString();

    const novo: Chamado = {

      ...data,

      id: crypto.randomUUID(),

      numero: getNextNumero(),

      status: 'NOVO',

      data_abertura: now,

      data_atualizacao: now,

    };

    setChamados(prev => [novo, ...prev]);

    toast.success('Chamado aberto com sucesso!');

    // 🚀 ENVIA PARA N8N
    fetch('https://muzyautomacao.app.n8n.cloud/webhook-test/novo-chamado', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({

        id: novo.id,
        numero: novo.numero,
        condominio_id: novo.condominio_id,

        nome: novo.nome,
        apartamento: novo.apartamento,
        email: novo.email,
        telefone: novo.telefone,

        prioridade: novo.prioridade,

        titulo: novo.titulo,
        descricao: novo.descricao,

        status: novo.status,

        data_abertura: novo.data_abertura

      }),

    }).catch(err => {

      console.log("Erro webhook:", err);

    });

  }, []);

  const updateChamado = useCallback((id: string, updates: Partial<Pick<Chamado, 'status' | 'responsavel' | 'prioridade'>>) => {

    setChamados(prev => prev.map(c => {

      if (c.id !== id) return c;

      const updated = {

        ...c,

        ...updates,

        data_atualizacao: new Date().toISOString()

      };

      const newHistory: HistoricoChamado[] = [];

      for (const [key, val] of Object.entries(updates)) {

        if (val !== undefined && val !== (c as any)[key]) {

          newHistory.push({

            id: crypto.randomUUID(),

            chamado_id: id,

            campo: key,

            valor_anterior: String((c as any)[key] ?? ''),

            valor_novo: String(val),

            usuario: user?.nome ?? 'Sistema',

            data: new Date().toISOString(),

          });

        }

      }

      if (newHistory.length > 0) {

        setHistorico(prev => [...newHistory, ...prev]);

      }

      return updated;

    }));

    toast.success('Chamado atualizado');

    const chamado = chamados.find(c => c.id === id);

    fetch('https://muzyautomacao.app.n8n.cloud/webhook-test/atualizacao', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({

        id,

        numero: chamado?.numero,

        ...updates

      }),

    }).catch(() => { });

  }, [user, chamados]);

  const deleteChamado = useCallback((id: string) => {

    setChamados(prev => prev.filter(c => c.id !== id));

    toast.success('Chamado excluído');

    fetch('https://muzyautomacao.app.n8n.cloud/webhook-test/delete', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({ id }),

    }).catch(() => { });

  }, []);

  const toggleDarkMode = useCallback(() => {

    setDarkMode(prev => {

      const next = !prev;

      document.documentElement.classList.toggle('dark', next);

      return next;

    });

  }, []);

  return (

    <AppContext.Provider value={{

      user,

      chamados,

      historico,

      login,

      logout,

      addChamado,

      updateChamado,

      deleteChamado,

      darkMode,

      toggleDarkMode,

      searchTerm,

      setSearchTerm,

      filterStatus,

      setFilterStatus,

      filterPriority,

      setFilterPriority,

    }}>

      {children}

    </AppContext.Provider>

  );

}