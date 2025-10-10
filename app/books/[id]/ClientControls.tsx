"use client";

import { Book } from "@/app/types/book";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteBookModal from "@/app/components/DeleteBookModal";
import { deleteBook } from "@/app/lib/actions";

interface ClientBookControlsProps {
  book: Book;
}

export function ClientBookControls({ book }: ClientBookControlsProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteBook(book.id.toString());
      router.push("/books");
      router.refresh();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/books")}
          className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          ← Voltar
        </button>
        <div className="flex gap-2">
          <Link href={`/books/${book.id}/edit`}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              ✏️ Editar
            </button>
          </Link>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🗑️ Excluir
          </button>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        bookTitle={book.title}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
