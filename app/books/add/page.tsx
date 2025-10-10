"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addBook } from "@/app/lib/actions";
import { Book, BookStatus, Genre } from "@/app/types/book";

export default function AddBookPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [genreSearch, setGenreSearch] = useState("");
  const [form, setForm] = useState<
    Partial<Omit<Book, "id" | "createdAt" | "genres">>
  >({
    status: "TO_READ" as BookStatus,
  });

  const filteredGenres = genres.filter((genre) =>
    genre.title.toLowerCase().includes(genreSearch.toLowerCase())
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Buscar gêneros quando o componente montar
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((err) => console.error("Erro ao carregar gêneros:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isGenresOpen && !target.closest("[data-genres-dropdown]")) {
        setIsGenresOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isGenresOpen]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    try {
      const url = new URL(value);
      setImageUrl(url.href);
    } catch (error) {
      setImageUrl(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!form.title || !form.author || !form.status) {
        setError("Título, autor e status são obrigatórios");
        return;
      }

      const bookData = {
        ...form,
        genres: selectedGenres.map((id) => ({ id })),
        rating: form.rating ? Number(form.rating) : undefined,
        pages: form.pages ? Number(form.pages) : undefined,
        currentPage: form.currentPage ? Number(form.currentPage) : undefined,
        totalPages: form.totalPages ? Number(form.totalPages) : undefined,
        isbn: form.isbn ? Number(form.isbn) : undefined,
      };

      await addBook(bookData as Omit<Book, "id" | "createdAt">);
      router.push("/books");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao adicionar livro");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Adicionar um Novo Livro à Sua Estante
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Image Preview Column */}
              <div className="md:col-span-1 flex flex-col items-center">
                <Label className="mb-4 text-lg font-semibold text-gray-700 self-start">
                  Capa do Livro
                </Label>
                <div className="relative w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Preview da capa"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      unoptimized
                    />
                  ) : (
                    <div className="text-gray-500 flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 14m6-6l.01.01"
                        />
                      </svg>
                      <span className="text-center">Preview da Imagem</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields Column */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div className="sm:col-span-2">
                  <Label
                    htmlFor="title"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Título
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title || ""}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 text-base"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label
                    htmlFor="author"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Autor
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    value={form.author || ""}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 text-base"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label
                    htmlFor="status"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Status
                  </Label>
                  <select
                    id="status"
                    name="status"
                    className="w-full border rounded-lg p-3 mt-2 text-base"
                    value={form.status || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione o status</option>
                    <option value="TO_READ">Para Ler</option>
                    <option value="READING">Lendo</option>
                    <option value="READ">Lido</option>
                    <option value="PAUSED">Pausado</option>
                    <option value="FINISHED">Finalizado</option>
                    <option value="ABANDONED">Abandonado</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label
                    htmlFor="genres"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Gêneros
                  </Label>
                  <div className="relative mt-2">
                    <button
                      type="button"
                      data-genres-dropdown
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
                      <div
                        data-genres-dropdown
                        className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg"
                      >
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
                <div>
                  <Label
                    htmlFor="totalPages"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Total de Páginas
                  </Label>
                  <Input
                    type="number"
                    id="totalPages"
                    name="totalPages"
                    value={form.totalPages || ""}
                    onChange={handleChange}
                    className="mt-2 p-3 text-base"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="currentPage"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Página Atual
                  </Label>
                  <Input
                    type="number"
                    id="currentPage"
                    name="currentPage"
                    value={form.currentPage || ""}
                    onChange={handleChange}
                    className="mt-2 p-3 text-base"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="rating"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Avaliação (0 a 5)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    id="rating"
                    name="rating"
                    value={form.rating || ""}
                    onChange={handleChange}
                    className="mt-2 p-3 text-base"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="isbn"
                    className="text-lg font-semibold text-gray-700"
                  >
                    ISBN
                  </Label>
                  <Input
                    id="isbn"
                    name="isbn"
                    value={form.isbn || ""}
                    onChange={handleChange}
                    className="mt-2 p-3 text-base"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label
                    htmlFor="isbn"
                    className="text-lg font-semibold text-gray-700"
                  >
                    URL da Imagem.
                  </Label>
                  <Input
                    id="coverUrl"
                    name="coverUrl"
                    placeholder="Cole a URL da imagem da capa"
                    value={form.coverUrl || ""}
                    onChange={handleUrlChange}
                    className="mt-2 p-3 text-base"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label
                    htmlFor="synopsis"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Sinopse
                  </Label>
                  <Textarea
                    id="synopsis"
                    name="synopsis"
                    value={form.synopsis || ""}
                    onChange={handleChange}
                    className="mt-2 p-3 text-base"
                    rows={5}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}
            <div className="flex justify-end mt-12">
              <Button
                type="submit"
                className="px-8 py-4 text-lg font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adicionando..." : "Adicionar Livro"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
