"use client";
import { useState } from "react";
import Image from "next/image";
import { deleteBook } from "@/actions/bookActions"; // Ajuste o path se necessário
interface BookCardProps {
  id: string;
  title: string;
  author: string;
  year?: number;
  genre?: string;
  rating?: number;
  image?: string;
  onDelete?: (id: string) => void; // Callback para remover da lista pai
}
export default function BookCard({
  id,
  title,
  author,
  year,
  genre,
  rating,
  image,
  onDelete,
}: BookCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir "${title}"?\nEssa ação não pode ser desfeita.`
    );
    if (!confirmDelete) return;
    setIsDeleting(true);
    const result = await deleteBook(id);
    setIsDeleting(false);
    if (result.success) {
      // Feedback local: remove da lista sem reload
      onDelete?.(id);
      // Opcional: alert("Livro excluído com sucesso!"); // Removido para usar toast no pai
    } else {
      alert("Erro ao excluir livro: " + (result.error || "Tente novamente."));
    }
}
  return (
    <div className="flex flex-col items-start gap-2 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
      <div className="w-full h-48 bg-gray-700 rounded-md flex items-center justify-center text-sm relative">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill // Usa fill para responsivo
            className="object-cover rounded-md"
          />
        ) : (
          "Capa do Livro"
        )}
      </div>
      <p className="font-semibold text-sm truncate w-full">{title}</p>
      <p className="text-xs text-gray-400">{author}</p>
      {year && <p className="text-xs text-gray-400">Ano: {year}</p>}
      {genre && <p className="text-xs text-gray-400">Gênero: {genre}</p>}
      {rating && <p className="text-xs text-gray-400">⭐ {rating}</p>}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="mt-2 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-500 text-sm transition-colors w-full"
      >
        {isDeleting ? "Excluindo..." : "Excluir"}
      </button>
    </div>
  );
}