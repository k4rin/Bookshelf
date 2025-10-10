"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { Book } from "../types/book";
import { getBooks } from "@/app/lib/actions";

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "createdAt">) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  getBookById: (id: string) => Book | undefined;
  searchBooks: (input: string) => Book[];
  isLoading: boolean;
  error: string | null;
  refreshBooks: () => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar livros do servidor
  const refreshBooks = async () => {
    setIsLoading(true);
    try {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar livros");
      console.error("Detailed book loading error:", JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar livros inicialmente e configurar atualização automática
  useEffect(() => {
    refreshBooks();

    // Atualizar a cada 30 segundos
    const interval = setInterval(() => {
      refreshBooks();
    }, 30000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  const addBook = (bookData: Omit<Book, "id" | "createdAt">) => {
    const newBook: Book = {
      ...bookData,
      id: Math.floor(Math.random() * 10000), // Temporário, será substituído pelo ID do servidor
      createdAt: new Date(),
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const searchBooks = (input: string) => {
    if (!input.trim()) return books;
    const lowercasedInput = input.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowercasedInput) ||
        book.author.toLowerCase().includes(lowercasedInput) ||
        book.genres.some((genre) =>
          genre.title.toLowerCase().includes(lowercasedInput)
        )
    );
  };

  const updateBook = (id: string, bookData: Partial<Book>) => {
    const numId = parseInt(id, 10);
    setBooks((prev) =>
      prev.map((book) => (book.id === numId ? { ...book, ...bookData } : book))
    );
  };

  const deleteBook = (id: string) => {
    const numId = parseInt(id, 10);
    setBooks((prev) => prev.filter((book) => book.id !== numId));
  };

  const getBookById = (id: string) => {
    const numId = parseInt(id, 10);
    return books.find((book) => book.id === numId);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        updateBook,
        deleteBook,
        getBookById,
        searchBooks,
        isLoading,
        error,
        refreshBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within BookProvider");
  }
  return context;
};
