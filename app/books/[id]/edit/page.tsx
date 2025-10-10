"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBook, updateBook } from "@/app/lib/actions";
import { Book, BookStatus, Genre } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const statusOptions = [
  { value: "TO_READ", label: "Para Ler" },
  { value: "READING", label: "Lendo" },
  { value: "READ", label: "Lido" },
  { value: "PAUSED", label: "Pausado" },
  { value: "FINISHED", label: "Finalizado" },
  { value: "ABANDONED", label: "Abandonado" },
] as const;

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const [formData, setFormData] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [genreSearch, setGenreSearch] = useState("");

  // Carregar gêneros
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
      }
    };

    loadGenres();
  }, []);

  // Carregar livro e configurar gêneros selecionados
  useEffect(() => {
    if (!id) {
      router.push("/books");
      return;
    }

    const loadBook = async () => {
      try {
        const bookData = await getBook(id);
        setFormData(bookData);
        if (bookData && bookData.genres) {
          setSelectedGenres(bookData.genres.map((g: Genre) => g.id));
        }
      } catch (error) {
        console.error("Erro ao carregar livro:", error);
        router.push("/books");
      }
    };

    loadBook();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return null;

      // Converter para número se for campo numérico
      if (
        name === "pages" ||
        name === "currentPage" ||
        name === "totalPages" ||
        name === "rating"
      ) {
        return { ...prev, [name]: value ? parseInt(value) : undefined };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleGenreChange = (genreId: number) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      } else {
        return [...prev, genreId];
      }
    });
  };

  const filteredGenres = genres.filter((genre) =>
    genre.title.toLowerCase().includes(genreSearch.toLowerCase())
  );

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => prev && { ...prev, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    if (!formData.title.trim() || !formData.author.trim()) {
      alert("Título e autor são obrigatórios");
      return;
    }

    setIsSubmitting(true);

    try {
      const { id, genres, createdAt, ...bookData } = formData;
      const updatedData = {
        ...bookData,
        genreIds: selectedGenres, // Enviando apenas os IDs dos gêneros selecionados
      };
      await updateBook(id.toString(), updatedData);
      router.push(`/books/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      alert("Erro ao atualizar livro");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  const progress = formData.totalPages
    ? Math.round(((formData.currentPage || 0) / formData.totalPages) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        ← Voltar
      </button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Editar Livro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Preview da Capa */}
            {formData.coverUrl && (
              <div className="flex justify-center mb-6">
                <img
                  src={formData.coverUrl}
                  alt={formData.title}
                  className="w-48 h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Grid de Campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Autor */}
              <div className="space-y-2">
                <Label htmlFor="author">Autor *</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Gêneros */}
              <div className="space-y-2 col-span-2">
                <Label htmlFor="genres">Gêneros</Label>
                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() => setIsGenresOpen(!isGenresOpen)}
                    className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className="text-sm text-gray-700">
                      {selectedGenres.length > 0
                        ? `${selectedGenres.length} ${
                            selectedGenres.length === 1 ? "gênero" : "gêneros"
                          } selecionado${
                            selectedGenres.length === 1 ? "" : "s"
                          }`
                        : "Selecione os gêneros"}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        isGenresOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown de Gêneros */}
                  {isGenresOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
                      <div className="p-3 border-b">
                        <div className="relative">
                          <input
                            type="text"
                            value={genreSearch}
                            onChange={(e) => setGenreSearch(e.target.value)}
                            placeholder="Buscar gêneros..."
                            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <svg
                            className="absolute right-3 top-2.5 w-4 h-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Lista de Gêneros */}
                      <div className="max-h-60 overflow-y-auto p-2">
                        {filteredGenres.length === 0 ? (
                          <div className="text-center py-4 text-gray-500">
                            Nenhum gênero encontrado
                          </div>
                        ) : (
                          filteredGenres.map((genre) => (
                            <div
                              key={genre.id}
                              onClick={() => handleGenreChange(genre.id)}
                              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                                selectedGenres.includes(genre.id)
                                  ? "bg-blue-50 text-blue-700"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  selectedGenres.includes(genre.id)
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedGenres.includes(genre.id) && (
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm">{genre.title}</span>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Rodapé com Tags */}
                      {selectedGenres.length > 0 && (
                        <div className="p-3 border-t bg-gray-50">
                          <div className="flex flex-wrap gap-2">
                            {selectedGenres.map((genreId) => {
                              const genre = genres.find(
                                (g) => g.id === genreId
                              );
                              if (!genre) return null;
                              return (
                                <span
                                  key={genre.id}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                                >
                                  {genre.title}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleGenreChange(genre.id);
                                    }}
                                    className="hover:text-blue-900"
                                  >
                                    ×
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total de Páginas */}
              <div className="space-y-2">
                <Label htmlFor="totalPages">Total de Páginas</Label>
                <Input
                  id="totalPages"
                  name="totalPages"
                  type="number"
                  value={formData.totalPages || ""}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              {/* Página Atual */}
              <div className="space-y-2">
                <Label htmlFor="currentPage">Página Atual</Label>
                <Input
                  id="currentPage"
                  name="currentPage"
                  type="number"
                  value={formData.currentPage || ""}
                  onChange={handleChange}
                  min="0"
                  max={formData.totalPages || undefined}
                />
              </div>

              {/* ISBN */}
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  name="isbn"
                  value={formData.isbn || ""}
                  onChange={handleChange}
                  placeholder="Opcional"
                />
              </div>

              {/* URL da Capa */}
              <div className="space-y-2 col-span-2">
                <Label htmlFor="coverUrl">URL da Capa</Label>
                <Input
                  id="coverUrl"
                  name="coverUrl"
                  type="url"
                  value={formData.coverUrl || ""}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Avaliação */}
            <div className="space-y-2">
              <Label>Avaliação</Label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`text-3xl transition-colors ${
                      formData.rating && star <= formData.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } hover:text-yellow-500`}
                  >
                    ★
                  </button>
                ))}
                {formData.rating && (
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating}/5 estrelas
                  </span>
                )}
              </div>
            </div>

            {/* Sinopse */}
            <div className="space-y-2">
              <Label htmlFor="synopsis">Sinopse</Label>
              <textarea
                id="synopsis"
                name="synopsis"
                value={formData.synopsis || ""}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Resumo do livro..."
              />
            </div>

            {/* Notas */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas Pessoais</Label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Suas anotações sobre o livro..."
              />
            </div>

            {/* Barra de Progresso */}
            {formData.totalPages && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Progresso de Leitura</Label>
                  <span className="text-sm text-gray-600">
                    {formData.currentPage || 0}/{formData.totalPages} (
                    {progress}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => router.push(`/books/${formData.id}`)}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
