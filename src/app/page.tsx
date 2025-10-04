"use client"; // Necessário para useState no Home (client-side)

import { useState } from "react"; // Para gerenciar lista e feedback
import { PlusIcon } from "@radix-ui/react-icons";

// Componente para a Barra Lateral
const Sidebar = () => {
  return (
    <nav className="flex flex-col gap-4 p-4 border-r border-gray-700 h-full w-64 bg-background fixed top-0 left-0 pt-20">
      <h2 className="text-lg font-bold">Minha Biblioteca</h2>
      
      <button className="flex items-center justify-center gap-2 bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] rounded-lg py-2 transition-colors">
        <PlusIcon />
        <span>Adicionar Livro</span>
      </button>

      <ul className="flex flex-col gap-2 mt-4 text-sm">
        <li>
          <a href="#" className="block px-3 py-1.5 rounded-md bg-gray-700/50 hover:bg-gray-700/70">Todos os Livros</a>
        </li>
        <li>
          <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-gray-700/20">Lendo Atualmente</a>
        </li>
        <li>
          <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-gray-700/20">Lidos</a>
        </li>
        <li>
          <a href="#" className="block px-3 py-1.5 rounded-md hover:bg-gray-700/20">Lista de Desejos</a>
        </li>
      </ul>
    </nav>
  );
};

// Interface para props do BookCard
interface BookCardProps {
  id?: string;
  title?: string;
  author?: string;
  onDelete?: (id: string) => void; // Callback para remover da lista
}

// Componente para o Card de Livro
const BookCard = ({ id = "default", title = "O Nome do Vento", author = "Patrick Rothfuss", onDelete }: BookCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!id) return;

    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir "${title}"?\nEssa ação não pode ser desfeita.`
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    
    const result = await deleteBook(id);
    setIsDeleting(false);

    if (result.success) {
      onDelete?.(id);
    } else {
      alert("Erro ao excluir livro: " + (result.error || "Tente novamente."));
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
      <div className="w-full h-48 bg-gray-700 rounded-md flex items-center justify-center text-sm">
        Capa do Livro
      </div>
      <p className="font-semibold text-sm truncate w-full">{title}</p>
      <p className="text-xs text-gray-400">{author}</p>
      
      {/* Botão de excluir atualizado com cores da paleta */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="mt-2 px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-500 text-sm transition-colors w-full"
      >
        {isDeleting ? "Excluindo..." : "Excluir"}
      </button>
    </div>
  );
};

export default function Home() {
  const [books, setBooks] = useState([
    { id: "1", title: "O Nome do Vento", author: "Patrick Rothfuss" },
    { id: "2", title: "O Hobbit", author: "J.R.R. Tolkien" },
    { id: "3", title: "1984", author: "George Orwell" },
    { id: "4", title: "Duna", author: "Frank Herbert" },
    { id: "5", title: "O Senhor dos Anéis", author: "J.R.R. Tolkien" },
    { id: "6", title: "Harry Potter", author: "J.K. Rowling" },
  ]);

  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleBookDelete = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
    setFeedback({ message: "Livro excluído com sucesso!", type: "success" });
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Barra Lateral */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Todos os Livros</h1>
        
        {feedback && (
          <div className={`mb-4 p-3 rounded-lg text-white ${
            feedback.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}>
            {feedback.message}
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              onDelete={handleBookDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

// Mock de exclusão (server action)
async function deleteBook(id: string) {
  try {
    console.log("Excluindo livro com id:", id);
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir livro:", error);
    return { success: false, error: "Erro ao excluir livro" };
  }
}

'use client';

import { useState } from 'react';
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
    sinopse: 'O Pequeno Príncipe conta a história de um menino que vive em um pequeno planeta e viaja por outros mundos em busca de amizade e sabedoria. Em suas aventuras, ele aprende lições sobre amor, solidão e o que realmente é importante na vida, descobrindo que “o essencial é invisível aos olhos.”'
  },
  {
    id: 2,
    capa: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg',
    titulo: '1984',
    autor: 'George Orwell',
    ano: 1949,
    estrelas: 4.8,
    genero: 'Distopia',
    sinopse: '1984, de George Orwell, conta a história de Winston Smith, que vive em um mundo controlado por um governo totalitário liderado pelo Grande Irmão. Nesse lugar, tudo é vigiado, até os pensamentos. Winston começa a questionar as regras e busca a verdade, mas descobre como é perigoso pensar diferente em uma sociedade que controla tudo.'
  },
  {
    id: 3,
    capa: 'https://imgs.search.brave.com/iMu9hPSHGClrH4g9_JllWyFLFH0NppiCLL4gNjA54w8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMy5z/dGF0aWMuYnJhc2ls/ZXNjb2xhLnVvbC5j/b20uYnIvYmUvMjAy/MS8wNi9jYXBhLWRv/LWxpdnJvLWRvbS1j/YXNtdXJyby5qcGc',
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    ano: 1899,
    estrelas: 4.2,
    genero: 'Romance',
    sinopse: 'Dom Casmurro, de Machado de Assis, conta a história de Bentinho, que desde jovem é apaixonado por Capitu. Eles se casam, mas com o tempo Bentinho passa a desconfiar que ela o traiu com seu melhor amigo, Escobar. A dúvida sobre a fidelidade de Capitu domina sua vida, deixando no ar se a traição realmente aconteceu ou se foi fruto de ciúme e imaginação.'
  },
   {
    id: 4,
    capa: 'https://imgs.search.brave.com/b9XOCGoVha9MOXUWTslMjhdPdFwCvFbXQ3O8PnhKYNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFNZGktb3dCUkwu/anBn',
    titulo: 'O Príncipe',
    autor: 'Nicolau Maquiavel',
    ano: 1513,
    estrelas: 4.9,
    genero: 'Clássico',
    sinopse: 'O Príncipe, de Maquiavel, é um livro que ensina como um governante deve agir para conquistar e manter o poder. Maquiavel mostra que, na política, às vezes é preciso ser esperto e até agir com dureza para garantir a estabilidade do Estado. A obra fala sobre liderança, estratégia e a realidade do poder, sem ilusões morais.'
  },
  {
    id: 5,
    capa: 'https://imgs.search.brave.com/95f0pG7iWumtq45izS8xvEoEkk5NzH_sE2E3lwqmpz4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpUZzNZVFV6/WkdVdFlqSTNZaTAw/WXpFeExUZzNNR1l0/T1dZMk1EYzFaVFUx/Wm1FNVhrRXlYa0Zx/Y0djQC5qcGc',
    titulo: 'O Conde de Monte Cristo',
    autor: ' Alexandre Dumas ',
    ano: 1844,
    estrelas: 4.7,
    genero: 'Clássico',
    sinopse: 'O Conde de Monte Cristo, de Alexandre Dumas, conta a história de Edmond Dantès, um jovem injustamente preso por traição. Após escapar da prisão e encontrar um grande tesouro, ele assume a identidade de Conde de Monte Cristo e busca vingança contra os que o traíram. A história fala sobre justiça, perdão e as consequências da vingança.'
  },
  {
    id: 6,
    capa: 'https://m.media-amazon.com/images/I/71lrH3ZLcaL._SY385_.jpg',
    titulo: 'Grande Sertão: Veredas',
    autor: 'Guimarães Rosa',
    ano: 1956,
    estrelas: 4.8,
    genero: 'Romance',
    sinopse: 'Grande Sertão: Veredas, de Guimarães Rosa, conta a história de Riobaldo, um ex-jagunço que narra suas aventuras e reflexões sobre o amor, a guerra e o bem e o mal. Ele relembra sua vida no sertão e sua relação com Diadorim, misturando realidade e filosofia em uma linguagem poética sobre a alma humana e o destino.'
  }
];

export default function Page() {
  const [livros, setLivros] = useState<Livro[]>(livrosIniciais);
  const [termoBusca, setTermoBusca] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState('todos');
  const [visualizarBookModal, setVisualizarBookModal] = useState<Livro | null>(null);
  const generos = ['todos', 'Infantil', 'Distopia', 'Romance'];

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
  const visualizarLivro = (livro: Livro) => 
  {setVisualizarBookModal(livro);}
  

  const editarLivro = (livro: Livro) => {
    alert(`Editar livro: ${livro.titulo}\n(Implementar página de edição depois)`);
  };

  const excluirLivro = (livro: Livro) => {
    if (confirm(`Tem certeza que deseja excluir "${livro.titulo}"?`)) {
      setLivros(livros.filter((l) => l.id !== livro.id));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Minha Estante de Livros</h1>

      {/* Busca e filtro */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        <input
          type="text"
          placeholder="Busque por título ou autor..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="border border-gray-300 rounded p-2 flex-grow mb-4 md:mb-0"
        />
        <select
          value={generoSelecionado}
          onChange={(e) => setGeneroSelecionado(e.target.value)}
          className="border border-gray-300 rounded p-2 w-48"
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
        <p className="text-center text-gray-500">Nenhum livro encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {livrosFiltrados.map((livro) => (
            <div
              key={livro.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={livro.capa}
                alt={`Capa do livro ${livro.titulo}`}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold mb-1">{livro.titulo}</h2>
              <p className="text-gray-700 mb-1">Autor: {livro.autor}</p>
              <p className="text-gray-700 mb-1">Ano: {livro.ano}</p>
              <p className="text-yellow-500 mb-3">⭐ {livro.estrelas} estrelas</p>
              <div className="flex gap-2">
                <button
                  onClick={() => visualizarLivro(livro)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Visualizar
                </button>
                <button
                  onClick={() => editarLivro(livro)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirLivro(livro)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {visualizarBookModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div>
          <BookModal  {...visualizarBookModal}
          onClose={() => setVisualizarBookModal(null)}
          onEdit={() => editarLivro(visualizarBookModal)}
          onDelete={() => excluirLivro(visualizarBookModal)}
          />
        </div>
      </div>
    )}
    </div>
);
}
