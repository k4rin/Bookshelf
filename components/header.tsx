import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            📚 Minha Biblioteca
          </Link>

          <nav className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Início</Button>
            </Link>
            <Link href="/books">
              <Button variant="ghost">Livros</Button>
            </Link>
            <Link href="/books/add">
              <Button>Adicionar Livro</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
