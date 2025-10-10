'use client';

import { BookProvider } from '../contexts/BookContext';
import Header from './header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </BookProvider>
  );
}