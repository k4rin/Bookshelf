import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

// Componente para a Barra Lateral
export const Sidebar = () => {
  // Ajustei a classe pt-20 para pt-16 para encaixar perfeitamente abaixo do Header fixo que sugeri na última resposta.
  return (
    <nav className="flex flex-col gap-4 p-4 border-r border-gray-700 h-full w-64 bg-background fixed top-0 left-0 pt-16">
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