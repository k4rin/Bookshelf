'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Para mobile menu
import { Menu } from 'lucide-react'; // Instale lucide-react: npm i lucide-react

export default function Navbar() {
  return (
    <nav className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          BookShelf
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/books">
            <Button variant="ghost">Biblioteca</Button>
          </Link>
          <Link href="/books/add">
            <Button>Adicionar Livro</Button>
          </Link>
        </div>
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right">
            <Link href="/" className="block py-2">Dashboard</Link>
            <Link href="/books" className="block py-2">Biblioteca</Link>
            <Link href="/books/add" className="block py-2">
              <Button className="w-full">Adicionar Livro</Button>
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
