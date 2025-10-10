// app/api/books/route.ts
import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

// Tipos auxiliares
type Genre = {
  id: number;
  title: string;
};

type BookGenre = {
  genre: Genre;
};

type Book = {
  id: number;
  title: string;
  author: string;
  status: string;
  createdAt: Date;
  genres: BookGenre[];
};

// ------------------ GET ------------------
export async function GET(request: Request) {
  const books = await prisma.book.findMany({
    include: {
      genres: { include: { genre: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // 🔧 Corrigido: parâmetros tipados
  const formattedBooks = books.map((book: Book) => ({
    ...book,
    genres: book.genres.map((bg: BookGenre) => bg.genre),
  }));

  return NextResponse.json(formattedBooks);
}

// ------------------ POST ------------------
export async function POST(request: Request) {
  const body = await request.json();
  const { genres, ...bookData } = body;

  if (!bookData.title || !bookData.author || !bookData.status) {
    return NextResponse.json(
      { error: "Título, autor e status são obrigatórios" },
      { status: 400 }
    );
  }

  const newBook = await prisma.book.create({
    data: {
      ...bookData,
      genres: {
        create:
          genres?.map((genre: { id: number }) => ({
            genre: { connect: { id: genre.id } },
          })) || [],
      },
    },
    include: {
      genres: { include: { genre: true } },
    },
  });

  // 🔧 Corrigido: tipagem no map
  const formattedBook = {
    ...newBook,
    genres: newBook.genres.map((bg: BookGenre) => bg.genre),
  };

  return NextResponse.json(formattedBook, { status: 201 });
}
