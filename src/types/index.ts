export enum StatusLeitura {
  QUERO_LER = 'QUERO_LER',
  LENDO = 'LENDO',
  LIDO = 'LIDO',
  PAUSADO = 'PAUSADO',
  ABANDONADO = 'ABANDONADO',
}

export interface Livro {
  id: string;
  title: string; // Obrigatório
  author: string; // Obrigatório
  genre: string; // Dos gêneros disponíveis
  year: number;
  pages?: number;
  currentPage?: number; // Para progresso
  rating: number; // 1-5
  synopsis?: string;
  cover?: string;
  status: StatusLeitura;
  isbn?: string;
  notes?: string; // Notas pessoais
}

export const generosDisponiveis = [
  'Literatura Brasileira', 'Ficção Científica', 'Realismo Mágico', 'Ficção', 'Fantasia',
  'Romance', 'Biografia', 'História', 'Autoajuda', 'Tecnologia', 'Programação',
  'Negócios', 'Psicologia', 'Filosofia', 'Poesia'
] as const;

export type Genero = typeof generosDisponiveis[number];
