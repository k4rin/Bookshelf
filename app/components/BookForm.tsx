"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/app/types/book";

interface Genre {
  id: number;
  title: string;
}

interface BookFormProps {
  book?: Book | null;
  genres: Genre[];
}

export default function BookForm({ book, genres }: BookFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  // Estados do formulário
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "to_read",
    totalPages: "",
    currentPage: "",
    rating: "",
    coverUrl: "",
    synopsis: "",
    isbn: "",
    notes: "",
    selectedGenres: [] as number[],
  });

  // Preencher form se estiver editando
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        status: book.status || "to_read",
        totalPages: book.totalPages?.toString() || "",
        currentPage: book.currentPage?.toString() || "",
        rating: book.rating?.toString() || "",
        coverUrl: book.coverUrl || "",
        synopsis: book.synopsis || "",
        isbn: book.isbn !== undefined && book.isbn !== null ? String(book.isbn) : "",
        notes: book.notes || "",
        selectedGenres: book.genres?.map((g) => g.id) || [],
      });
    }
  }, [book]);

  // Auto-hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreToggle = (genreId: number) => {
    setFormData((prev) => {
      const isSelected = prev.selectedGenres.includes(genreId);
      return {
        ...prev,
        selectedGenres: isSelected
          ? prev.selectedGenres.filter((id) => id !== genreId)
          : [...prev.selectedGenres, genreId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        author: formData.author,
        status: formData.status,
        totalPages: formData.totalPages ? Number(formData.totalPages) : null,
        currentPage: formData.currentPage ? Number(formData.currentPage) : null,
        rating: formData.rating ? Number(formData.rating) : null,
        coverUrl: formData.coverUrl || null,
        synopsis: formData.synopsis || null,
        isbn: formData.isbn || null,
        notes: formData.notes || null,
        genres: formData.selectedGenres.map((id) => ({ id })),
      };

      const url = book ? `/api/books/${book.id}` : "/api/books";
      const method = book ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao salvar livro");
      }

      showToast(
        book ? "Livro atualizado com sucesso!" : "Livro criado com sucesso!",
        "success"
      );

      setTimeout(() => {
        router.push("/books");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      showToast(
        error instanceof Error ? error.message : "Erro ao salvar livro",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Informações Básicas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Informações Básicas</h2>

          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Ex: 1984"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Autor */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Autor <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Ex: George Orwell"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="to_read">Para Ler</option>
              <option value="reading">Lendo</option>
              <option value="finished">Finalizado</option>
            </select>
          </div>

          {/* ISBN */}
          <div>
            <label htmlFor="isbn" className="block text-sm font-medium mb-1">
              ISBN
            </label>
            <input
              id="isbn"
              name="isbn"
              type="text"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Ex: 978-0451524935"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Páginas e Progresso */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Páginas e Progresso</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Total de Páginas */}
            <div>
              <label
                htmlFor="totalPages"
                className="block text-sm font-medium mb-1"
              >
                Total de Páginas
              </label>
              <input
                id="totalPages"
                name="totalPages"
                type="number"
                value={formData.totalPages}
                onChange={handleChange}
                min="1"
                placeholder="Ex: 328"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Página Atual */}
            <div>
              <label
                htmlFor="currentPage"
                className="block text-sm font-medium mb-1"
              >
                Página Atual
              </label>
              <input
                id="currentPage"
                name="currentPage"
                type="number"
                value={formData.currentPage}
                onChange={handleChange}
                min="0"
                placeholder="Ex: 150"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium mb-1">
              Avaliação (0-5)
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              placeholder="Ex: 4.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Gêneros Literários */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Gêneros Literários</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                type="button"
                onClick={() => handleGenreToggle(genre.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  formData.selectedGenres.includes(genre.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {genre.title}
              </button>
            ))}
          </div>
          {genres.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhum gênero disponível. Crie gêneros primeiro.
            </p>
          )}
        </div>

        {/* Detalhes Adicionais */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Detalhes Adicionais</h2>

          {/* URL da Capa */}
          <div>
            <label
              htmlFor="coverUrl"
              className="block text-sm font-medium mb-1"
            >
              URL da Capa
            </label>
            <input
              id="coverUrl"
              name="coverUrl"
              type="url"
              value={formData.coverUrl}
              onChange={handleChange}
              placeholder="https://exemplo.com/capa.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            {formData.coverUrl && (
              <div className="mt-2">
                <img
                  src={formData.coverUrl}
                  alt="Preview da capa"
                  className="w-32 h-48 object-cover rounded shadow"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-book.png";
                  }}
                />
              </div>
            )}
          </div>

          {/* Sinopse */}
          <div>
            <label
              htmlFor="synopsis"
              className="block text-sm font-medium mb-1"
            >
              Sinopse
            </label>
            <textarea
              id="synopsis"
              name="synopsis"
              value={formData.synopsis}
              onChange={handleChange}
              rows={4}
              placeholder="Descreva brevemente o livro..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Notas */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Notas Pessoais
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Suas observações sobre o livro..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading
              ? "Salvando..."
              : book
              ? "Atualizar Livro"
              : "Criar Livro"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}