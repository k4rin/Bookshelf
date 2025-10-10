import { getBooks } from "@/app/lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import BookSearch from "@/components/BookSearch";
import BookFilters from "../components/BookFilters";
import { ClientBookCard } from "@/components/BookCard";
import { supabase } from "@/lib/supabase";
import type { Book } from "@/app/types/book";

async function getGenres() {
  const { data } = await supabase.from("genres").select("*").order("title");
  return data || [];
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; genre?: string }>;
}) {
  const { q, status, genre } = await searchParams;
  const [books, genres] = await Promise.all([getBooks(), getGenres()]);

  const filteredBooks = books.filter((book: Book) => {
    // Filtro de busca por texto
    if (q) {
      const searchTerms = q.toLowerCase().split(" ");
      const matchesSearch = searchTerms.every(
        (term) =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          (book.genres &&
            book.genres.some((g) => g.title.toLowerCase().includes(term))) ||
          (book.synopsis && book.synopsis.toLowerCase().includes(term))
      );
      if (!matchesSearch) return false;
    }

    // Filtro de status
    if (status && book.status !== status) return false;

    // Filtro de gênero
    if (genre && book.genres) {
      const hasGenre = book.genres.some((g) => g.id === Number(genre));
      if (!hasGenre) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meus Livros</h1>
        <Link
          href="/books/add"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Adicionar Livro
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pesquisar Livros</CardTitle>
        </CardHeader>
        <CardContent>
          <BookSearch />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <BookFilters genres={genres} />
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600">
        Mostrando {filteredBooks.length} de {books.length} livros
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book: Book) => (
          <ClientBookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Nenhum livro encontrado</p>
          <Link
            href="/books/add"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Adicionar seu primeiro livro
          </Link>
        </div>
      )}

      {books.length > 0 && filteredBooks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum livro encontrado com os filtros aplicados</p>
          <p className="text-sm text-gray-400 mt-2">
            Tente ajustar os filtros ou limpar a busca
          </p>
        </div>
      )}
    </div>
  );
}