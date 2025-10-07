'use client';

import { useState, useEffect } from 'react';
import BookModal from '@/components/BookModal/BookModal';

interface Livro {
  id: number;
  capa: string;
  titulo: string;
  autor: string;
  ano: number;
  estrelas: number;
  genero: string;
  sinopse?: string;
  status: 'not_started' | 'reading' | 'finished'; // Novo campo para status
  totalPages?: number; // Total de páginas do livro (opcional)
  pagesRead?: number; // Páginas lidas (opcional, default 0)
}

const livrosIniciais: Livro[] = [
  {
    id: 1,
    capa: 'https://grupoeditorialglobal.com.br/capas/400/3932.jpg',
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    ano: 1943,
    estrelas: 4.5,
    genero: 'Infantil',
    sinopse: 'O Pequeno Príncipe conta a história de um menino que vive em um pequeno planeta e viaja por outros mundos em busca de amizade e sabedoria. Em suas aventuras, ele aprende lições sobre amor, solidão e o que realmente é importante na vida, descobrindo que “o essencial é invisível aos olhos.”',
    status: 'finished',
    totalPages: 96,
    pagesRead: 96
  },
  {
    id: 2,
    capa: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg',
    titulo: '1984',
    autor: 'George Orwell',
    ano: 1949,
    estrelas: 4.8,
    genero: 'Distopia',
    sinopse: '1984, de George Orwell, conta a história de Winston Smith, que vive em um mundo controlado por um governo totalitário liderado pelo Grande Irmão. Nesse lugar, tudo é vigiado, até os pensamentos. Winston começa a questionar as regras e busca a verdade, mas descobre como é perigoso pensar diferente em uma sociedade que controla tudo.',
    status: 'reading',
    totalPages: 328,
    pagesRead: 150
  },
  {
    id: 3,
    capa: 'https://imgs.search.brave.com/iMu9hPSHGClrH4g9_JllWyFLFH0NppiCLL4gNjA54w8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMy5z/dGF0aWMuYnJhc2ls/ZXNjb2xhLnVvbC5j/b20uYnIvYmUvMjAy/MS8wNi9jYXBhLWRv/LWxpdnJvLWRvbS1j/YXNtdXJyby5qcGc',
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    ano: 1899,
    estrelas: 4.2,
    genero: 'Romance',
    sinopse: 'Dom Casmurro, de Machado de Assis, conta a história de Bentinho, que desde jovem é apaixonado por Capitu. Eles se casam, mas com o tempo Bentinho passa a desconfiar que ela o traiu com seu melhor amigo, Escobar. A dúvida sobre a fidelidade de Capitu domina sua vida, deixando no ar se a traição realmente aconteceu ou se foi fruto de ciúme e imaginação.',
    status: 'finished',
    totalPages: 256,
    pagesRead: 256
  },
  {
    id: 4,
    capa: 'https://imgs.search.brave.com/b9XOCGoVha9MOXUWTslMjhdPdFwCvFbXQ3O8PnhKYNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFNZGktb3dCUkwu/anBn',
    titulo: 'O Príncipe',
    autor: 'Nicolau Maquiavel',
    ano: 1513,
    estrelas: 4.9,
    genero: 'Clássico',
    sinopse: 'O Príncipe, de Maquiavel, é um livro que ensina como um governante deve agir para conquistar e manter o poder. Maquiavel mostra que, na política, às vezes é preciso ser esperto e até agir com dureza para garantir a estabilidade do Estado. A obra fala sobre liderança, estratégia e a realidade do poder, sem ilusões morais.',
    status: 'not_started',
    totalPages: 128,
    pagesRead: 0
  },
  {
    id: 5,
    capa: 'https://imgs.search.brave.com/95f0pG7iWumtq45izS8xvEoEkk5NzH_sE2E3lwqmpz4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpUZzNZVFV6/WkdVdFlqSTNZaTAw/WXpFeExUZzNNR1l0/T1dZMk1EYzFaVFUx/Wm1FNVhrRXlYa0Zx/Y0djQC5qcGc',
    titulo: 'O Conde de Monte Cristo',
    autor: 'Alexandre Dumas',
    ano: 1844,
    estrelas: 4.7,
    genero: 'Clássico',
    sinopse: 'O Conde de Monte Cristo, de Alexandre Dumas, conta a história de Edmond Dantès, um jovem injustamente preso por traição. Após escapar da prisão e encontrar um grande tesouro, ele assume a identidade de Conde de Monte Cristo e busca vingança contra os que o traíram. A história fala sobre justiça, perdão e as consequências da vingança.',
    status: 'reading',
    totalPages: 1200,
    pagesRead: 800
  },
  {
    id: 6,
    capa: 'https://m.media-amazon.com/images/I/71lrH3ZLcaL._SY385_.jpg',
    titulo: 'Grande Sertão: Veredas',
    autor: 'Guimarães Rosa',
    ano: 1956,
    estrelas: 4.8,
    genero: 'Romance',
    sinopse: 'Grande Sertão: Veredas, de Guimarães Rosa, conta a história de Riobaldo, um ex-jagunço que narra suas aventuras e reflexões sobre o amor, a guerra e o bem e o mal. Ele relembra sua vida no sertão e sua relação com Diadorim, misturando realidade e filosofia em uma linguagem poética sobre a alma humana e o destino.',
    status: 'finished',
    totalPages: 592,
    pagesRead: 592
  }
];

const generosDisponiveis = ['Infantil', 'Distopia', 'Romance', 'Clássico']; // Para o select do formulário
const generos = ['todos', 'Infantil', 'Distopia', 'Romance', 'Clássico']; // Para o filtro (inclui 'todos' e todos os gêneros)

export default function Page() {
  const [livros, setLivros] = useState<Livro[]>(livrosIniciais);
  const [termoBusca, setTermoBusca] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState('todos');
  const [visualizarBookModal, setVisualizarBookModal] = useState<Livro | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para tema dark/light

  // Estados para o modal de formulário
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLivro, setEditingLivro] = useState<Livro | null>(null); // null para adicionar novo
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    ano: '',
    genero: '',
    capa: '',
    estrelas: '',
    status: 'not_started' as 'not_started' | 'reading' | 'finished',
    totalPages: '',
    pagesRead: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewCapa, setPreviewCapa] = useState(''); // Para preview da URL

  // Calcular estatísticas para o dashboard
  const totalLivros = livros.length;
  const livrosLendo = livros.filter(l => l.status === 'reading').length;
  const livrosFinalizados = livros.filter(l => l.status === 'finished').length;
  const totalPaginasLidas = livros.reduce((sum, l) => sum + (l.pagesRead || 0), 0);

  // Aplicar tema dark ao body (mock para persistência; em produção, use localStorage)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Mock: Salvar no localStorage (simulado)
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Carregar tema do localStorage no mount (mock)
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // CÓDIGO CORRIGIDO PARA GARANTIR A MUDANÇA DE ESTADO
  const toggleDarkMode = () => {
    // Usar a função de callback garante que você pega o estado mais recente (prevMode)
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      
      // Embora o useEffect abaixo já faça isso, é bom ter certeza que o localStorage
      // está sendo atualizado imediatamente com o valor correto
      localStorage.setItem('darkMode', newMode.toString()); 
        
      return newMode;
    });
  };

  // Funções mockadas para o menu lateral
  const handleDashboardClick = () => {
    // Mock: Scroll para o dashboard ou navegação
    document.querySelector('.dashboard-section')?.scrollIntoView({ behavior: 'smooth' });
    console.log('Navegação para Dashboard mockada');
  };

  const handleEstanteClick = () => {
    // Mock: Scroll para a estante
    document.querySelector('.estante-section')?.scrollIntoView({ behavior: 'smooth' });
    console.log('Navegação para Estante mockada');
  };

  const handleAdicionarClick = () => {
    openModal();
    console.log('Adicionar Livro mockado (abre modal)');
  };

  const handleConfiguracoesClick = () => {
    // Mock: Abrir configurações (pode ser um modal futuro)
    console.log('Configurações mockadas');
  };

  // Abrir modal para adicionar novo
  const openModal = () => {
    setEditingLivro(null);
    setFormData({ 
      titulo: '', 
      autor: '', 
      ano: '', 
      genero: '', 
      capa: '', 
      estrelas: '', 
      status: 'not_started',
      totalPages: '',
      pagesRead: ''
    });
    setErrors({});
    setPreviewCapa('');
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const openEditModal = (livro: Livro) => {
    setEditingLivro(livro);
    setFormData({
      titulo: livro.titulo,
      autor: livro.autor,
      ano: livro.ano.toString(),
      genero: livro.genero,
      capa: livro.capa,
      estrelas: livro.estrelas.toString(),
      status: livro.status,
      totalPages: livro.totalPages?.toString() || '',
      pagesRead: livro.pagesRead?.toString() || '',
    });
    setPreviewCapa(livro.capa);
    setErrors({});
    setIsModalOpen(true);
  };

  // Fechar modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Atualizar preview da capa
  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, capa: url }));
    setPreviewCapa(url || ''); // Limpa se vazio
  };

  // Validar formulário
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.titulo.trim()) newErrors.titulo = 'Título é obrigatório.';
    if (!formData.autor.trim()) newErrors.autor = 'Autor é obrigatório.';
    if (!formData.ano || isNaN(Number(formData.ano)) || Number(formData.ano) < 0) {
      newErrors.ano = 'Ano deve ser um número válido (≥ 0).';
    }
    if (!formData.genero) newErrors.genero = 'Gênero é obrigatório.';

    if (formData.estrelas && (isNaN(Number(formData.estrelas)) || Number(formData.estrelas) < 0 || Number(formData.estrelas) > 5)) {
      newErrors.estrelas = 'Estrelas deve ser um número entre 0 e 5.';
    }

    if (formData.totalPages && (isNaN(Number(formData.totalPages)) || Number(formData.totalPages) < 0)) {
      newErrors.totalPages = 'Total de páginas deve ser um número válido (≥ 0).';
    }

    if (formData.pagesRead && (isNaN(Number(formData.pagesRead)) || Number(formData.pagesRead) < 0)) {
      newErrors.pagesRead = 'Páginas lidas deve ser um número válido (≥ 0).';
    }

    if (formData.totalPages && formData.pagesRead && Number(formData.pagesRead) > Number(formData.totalPages)) {
      newErrors.pagesRead = 'Páginas lidas não pode exceder o total de páginas.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submeter formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const novoLivro: Livro = {
      id: editingLivro ? editingLivro.id : Math.max(...livros.map(l => l.id)) + 1,
      titulo: formData.titulo.trim(),
      autor: formData.autor.trim(),
      ano: Number(formData.ano),
      genero: formData.genero,
      capa: formData.capa.trim() || '', // Opcional
      estrelas: formData.estrelas ? Number(formData.estrelas) : 0, // Default 0 se vazio
      status: formData.status,
      totalPages: formData.totalPages ? Number(formData.totalPages) : undefined,
      pagesRead: formData.pagesRead ? Number(formData.pagesRead) : 0,
      // sinopse: undefined (opcional; adicione campo no form se necessário)
    };

    if (editingLivro) {
      // Editar
      setLivros(livros.map(l => l.id === editingLivro.id ? novoLivro : l));
    } else {
      // Adicionar
      setLivros([...livros, novoLivro]);
    }

    closeModal();
  };

   // Filtra livros por busca e gênero
  const livrosFiltrados = livros.filter((livro) => {
    const busca = termoBusca.toLowerCase();
    const matchesBusca =
      livro.titulo.toLowerCase().includes(busca) ||
      livro.autor.toLowerCase().includes(busca);
    const matchesGenero =
      generoSelecionado === 'todos' || livro.genero === generoSelecionado;
    return matchesBusca && matchesGenero;
  });

  // Funções dos botões
  const visualizarLivro = (livro: Livro) => {
    setVisualizarBookModal(livro);
  };

  const excluirLivro = (livro: Livro) => {
    if (confirm(`Tem certeza que deseja excluir "${livro.titulo}"?`)) {
      setLivros(livros.filter((l) => l.id !== livro.id));
      // Fecha modal se estiver aberto
      if (visualizarBookModal?.id === livro.id) {
        setVisualizarBookModal(null);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Menu Lateral (Sidebar) */}
      <aside className="w-64 bg-gray-800 dark:bg-gray-900 text-white fixed h-full overflow-y-auto shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Menu Principal</h2>
          <ul className="space-y-2 mb-6">
            <li>
              <button
                onClick={handleDashboardClick}
                className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-700 transition flex items-center"
              >
                📊 Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={handleEstanteClick}
                className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-700 transition flex items-center"
              >
                📚 Estante de Livros
              </button>
            </li>
            <li>
              <button
                onClick={handleAdicionarClick}
                className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-700 transition flex items-center"
              >
                ➕ Adicionar Livro
              </button>
            </li>
            <li>
              <button
                onClick={handleConfiguracoesClick}
                className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-700 transition flex items-center"
              >
                ⚙️ Configurações
              </button>
            </li>
          </ul>

          {/* Botão Toggle Dark/Light Mode */}
          <div className="border-t border-gray-600 pt-4">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-center py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-700 transition"
            >
              {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
            </button>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 ml-64 p-6">
        {/* Dashboard Principal */}
        <div className="mb-8 dashboard-section">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Principal</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total de livros cadastrados */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Total de Livros Cadastrados</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalLivros}</p>
            </div>

            {/* Livros sendo lidos atualmente */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Livros Sendo Lidos</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{livrosLendo}</p>
            </div>

            {/* Livros já finalizados */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Livros Finalizados</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{livrosFinalizados}</p>
            </div>

            {/* Total de páginas lidas */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Total de Páginas Lidas</h3>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalPaginasLidas.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Seção da Estante de Livros */}
        <div className="container mx-auto max-w-5xl estante-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Minha Estante de Livros</h2>
            <button
              onClick={openModal}
              className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded hover:bg-green-700 dark:hover:bg-green-600 transition"
            >
              Adicionar Livro
            </button>
          </div>

          {/* Busca e filtro */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
            <input
              type="text"
              placeholder="Busque por título ou autor..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded p-2 flex-grow mb-4 md:mb-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <select
              value={generoSelecionado}
              onChange={(e) => setGeneroSelecionado(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded p-2 w-48 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              {generos.map((genero) => (
                <option key={genero} value={genero}>
                  {genero === 'todos' ? 'Todos os gêneros' : genero}
                </option>
              ))}
            </select>
          </div>

          {/* Lista de livros */}
          {livrosFiltrados.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Nenhum livro encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {livrosFiltrados.map((livro) => (
                <div
                  key={livro.id}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
                >
                  <img
                    src={livro.capa || '/placeholder-capa.jpg'}
                    alt={`Capa do livro ${livro.titulo}`}
                    className="w-full h-48 object-cover rounded mb-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-capa.jpg';
                    }}
                  />
                  <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">{livro.titulo}</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">Autor: {livro.autor}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">Ano: {livro.ano}</p>
                  <p className="text-yellow-500 mb-1">⭐ {livro.estrelas} estrelas</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    Status: {livro.status === 'not_started' ? 'Não iniciado' : livro.status === 'reading' ? 'Lendo' : 'Finalizado'}
                  </p>
                  {livro.totalPages && (
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Páginas: {livro.pagesRead || 0}/{livro.totalPages}
                    </p>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => visualizarLivro(livro)}
                      className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition flex-1"
                      aria-label={`Visualizar ${livro.titulo}`}
                    >
                      Visualizar
                    </button>
                    <button
                      onClick={() => openEditModal(livro)}
                      className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-600 dark:hover:bg-yellow-500 transition flex-1"
                      aria-label={`Editar ${livro.titulo}`}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirLivro(livro)}
                      className="bg-red-600 dark:bg-red-700 text-white px-3 py-1 rounded hover:bg-red-700 dark:hover:bg-red-600 transition flex-1"
                      aria-label={`Excluir ${livro.titulo}`}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal de Visualização do Livro */}
          {visualizarBookModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-60 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                <button
                  onClick={() => setVisualizarBookModal(null)}
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold"
                  aria-label="Fechar modal"
                >
                  ×
                </button>
                <BookModal
                  {...visualizarBookModal}
                  onClose={() => setVisualizarBookModal(null)}
                  onEdit={() => {
                    setVisualizarBookModal(null);
                    openEditModal(visualizarBookModal);
                  }}
                  onDelete={() => {
                    setVisualizarBookModal(null);
                    excluirLivro(visualizarBookModal);
                  }}
                />
              </div>
            </div>
          )}

          {/* Modal do Formulário (Adicionar/Editar) */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-60 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold"
                  aria-label="Fechar modal"
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  {editingLivro ? 'Editar Livro' : 'Adicionar Novo Livro'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Título */}
                  <div>
                    <label htmlFor="titulo" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Título *</label>
                    <input
                      id="titulo"
                      type="text"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                    {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
                  </div>

                  {/* Autor */}
                  <div>
                    <label htmlFor="autor" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Autor *</label>
                    <input
                      id="autor"
                      type="text"
                      value={formData.autor}
                      onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                    {errors.autor && <p className="text-red-500 text-sm mt-1">{errors.autor}</p>}
                  </div>

                  {/* Ano */}
                  <div>
                    <label htmlFor="ano" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Ano *</label>
                    <input
                      id="ano"
                      type="number"
                      value={formData.ano}
                      onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                      min="0"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                    {errors.ano && <p className="text-red-500 text-sm mt-1">{errors.ano}</p>}
                  </div>

                  {/* Gênero */}
                  <div>
                    <label htmlFor="genero" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Gênero *</label>
                    <select
                      id="genero"
                      value={formData.genero}
                      onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">Selecione um gênero</option>
                      {generosDisponiveis.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero}</p>}
                  </div>

                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Status *</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'not_started' | 'reading' | 'finished' })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="not_started">Não iniciado</option>
                      <option value="reading">Lendo</option>
                      <option value="finished">Finalizado</option>
                    </select>
                  </div>

                  {/* Total de Páginas (Opcional) */}
                  <div>
                    <label htmlFor="totalPages" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Total de Páginas - Opcional</label>
                    <input
                      id="totalPages"
                      type="number"
                      value={formData.totalPages}
                      onChange={(e) => setFormData({ ...formData, totalPages: e.target.value })}
                      min="0"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.totalPages && <p className="text-red-500 text-sm mt-1">{errors.totalPages}</p>}
                  </div>

                                    {/* Páginas Lidas (Opcional) */}
                  <div>
                    <label htmlFor="pagesRead" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Páginas Lidas - Opcional</label>
                    <input
                      id="pagesRead"
                      type="number"
                      value={formData.pagesRead}
                      onChange={(e) => setFormData({ ...formData, pagesRead: e.target.value })}
                      min="0"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.pagesRead && <p className="text-red-500 text-sm mt-1">{errors.pagesRead}</p>}
                  </div>

                  {/* Capa (Opcional) */}
                  <div>
                    <label htmlFor="capa" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Capa (URL da imagem) - Opcional
                    </label>
                    <input
                      id="capa"
                      type="url"
                      value={formData.capa}
                      onChange={handleCapaChange}
                      placeholder="https://exemplo.com/capa.jpg"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {/* Preview da Capa */}
                    {previewCapa && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Prévia da capa:</p>
                        <img
                          src={previewCapa}
                          alt="Prévia da capa"
                          className="w-full h-32 object-cover rounded border border-gray-300 dark:border-gray-600"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-capa.jpg';
                            target.alt = 'URL inválida ou imagem não carregada';
                          }}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {previewCapa ? 'URL válida' : 'Insira uma URL para ver a prévia'}
                        </p>
                      </div>
                    )}
                    {!previewCapa && formData.capa && (
                      <p className="text-sm text-orange-500 mt-1">URL inválida ou imagem não carregada. Verifique a URL.</p>
                    )}
                  </div>

                  {/* Estrelas (Opcional) */}
                  <div>
                    <label htmlFor="estrelas" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Estrelas (0 a 5) - Opcional
                    </label>
                    <input
                      id="estrelas"
                      type="number"
                      value={formData.estrelas}
                      onChange={(e) => setFormData({ ...formData, estrelas: e.target.value })}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.estrelas && <p className="text-red-500 text-sm mt-1">{errors.estrelas}</p>}
                  </div>

                  {/* Botões do Formulário */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-500 dark:bg-gray-600 text-white py-2 rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:opacity-50"
                      disabled={Object.keys(errors).length > 0}
                    >
                      {editingLivro ? 'Atualizar' : 'Adicionar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

