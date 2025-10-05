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
