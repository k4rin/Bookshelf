"use client";

import { Book } from "@/app/types/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import DeleteBookModal from "@/app/components/DeleteBookModal";
import { deleteBook } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

const statusLabels = {
  TO_READ: "Para Ler",
  READING: "Lendo",
  READ: "Lido",
  PAUSED: "Pausado",
  FINISHED: "Finalizado",
  ABANDONED: "Abandonado",
} as const;

const statusColors = {
  TO_READ: "bg-gray-100 text-gray-800",
  READING: "bg-blue-100 text-blue-800",
  READ: "bg-green-100 text-green-800",
  PAUSED: "bg-yellow-100 text-yellow-800",
  FINISHED: "bg-green-100 text-green-800",
  ABANDONED: "bg-red-100 text-red-800",
} as const;

interface BookCardProps {
  book: Book;
}

export function ClientBookCard({ book }: BookCardProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      await deleteBook(book.id.toString());
      setIsDeleteModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex gap-4">
            {/* Capa do livro */}
            {book.coverUrl && (
              <div className="hidden sm:block flex-shrink-0">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded-lg shadow-sm"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg line-clamp-2">
                  {book.title}
                </CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    statusColors[book.status]
                  }`}
                >
                  {statusLabels[book.status]}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">por {book.author}</p>

              {/* Gêneros logo abaixo do autor */}
              {book.genres && book.genres.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {book.genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {genre.title}
                    </span>
                  ))}
                  {book.genres.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs text-gray-500">
                      +{book.genres.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {book.totalPages && (
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Páginas:</span>{" "}
                  {book.totalPages}
                </p>
              )}
              {book.currentPage !== undefined && book.totalPages && (
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Progresso:</span>{" "}
                  {Math.round((book.currentPage / book.totalPages) * 100)}%
                </p>
              )}
              {book.rating && (
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium mr-1">Avaliação:</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < book.rating! ? "text-yellow-400" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sinopse resumida se disponível */}
            {book.synopsis && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {book.synopsis}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <Link href={`/books/${book.id}`} className="flex-1">
                <button className="w-full px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors">
                  Ver Detalhes
                </button>
              </Link>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                title="Excluir livro"
              >
                🗑️
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Confirmação de Exclusão */}
      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        bookTitle={book.title}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
