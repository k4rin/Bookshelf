import { PlusIcon } from "@radix-ui/react-icons";

// Componente simples para a Barra Lateral
const Sidebar = () => {
  return (
    <nav className="flex flex-col gap-4 p-4 border-r border-gray-700 h-full w-64 bg-background fixed top-0 left-0 pt-20">
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

// Componente simples para o Card de Livro (Mock-up)
const BookCard = () => {
  return (
    <div className="flex flex-col items-start gap-2 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
      <div className="w-full h-48 bg-gray-700 rounded-md flex items-center justify-center text-sm">
        Capa do Livro
      </div>
      <p className="font-semibold text-sm truncate w-full">O Nome do Vento</p>
      <p className="text-xs text-gray-400">Patrick Rothfuss</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex">
      {/* Barra Lateral - Fixed */}
      <Sidebar />

      {/* Main Content - Com margem para a Sidebar */}
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Todos os Livros</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          {/* Adicione mais BookCard para preencher a tela */}
        </div>
      </main>
    </div>
  );
}