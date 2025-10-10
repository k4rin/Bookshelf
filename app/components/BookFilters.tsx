"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface BookFiltersProps {
  genres: { id: number; title: string }[];
}

const statusOptions = [
  { value: "", label: "Todos os Status" },
  { value: "TO_READ", label: "Para Ler" },
  { value: "READING", label: "Lendo" },
  { value: "READ", label: "Lido" },
  { value: "PAUSED", label: "Pausado" },
  { value: "FINISHED", label: "Finalizado" },
  { value: "ABANDONED", label: "Abandonado" },
];

export default function BookFilters({ genres }: BookFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || ""
  );
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || ""
  );

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedStatus) {
      params.set("status", selectedStatus);
    } else {
      params.delete("status");
    }
    
    if (selectedGenre) {
      params.set("genre", selectedGenre);
    } else {
      params.delete("genre");
    }

    router.push(`/books?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedStatus("");
    setSelectedGenre("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    params.delete("genre");
    router.push(`/books?${params.toString()}`);
  };

  const hasFilters = selectedStatus || selectedGenre;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filtro de Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Gênero */}
        <div>
          <label className="block text-sm font-medium mb-2">Gênero</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos os Gêneros</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Aplicar Filtros
        </button>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  );
}