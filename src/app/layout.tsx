import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { GitHubLogoIcon } from "@radix-ui/react-icons";

// Novo Componente Header
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 h-16 bg-background/90 backdrop-blur-sm border-b border-gray-700/50 flex items-center justify-between px-8">
      <div className="text-xl font-mono font-bold">BookShelf</div>
      <a 
        href="https://github.com/k4rin/bookshelf" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-foreground hover:text-gray-500 transition-colors"
        aria-label="GitHub Repository"
      >
        <GitHubLogoIcon width={24} height={24} />
      </a>
    </header>
  );
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookShelf",
  description: "Gerenciamento de biblioteca pessoal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 1. O Header Fixo */}
        <Header />
        
        {/* 2. O Conteúdo da Página com Padding para descer */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}