import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

// Tipos auxiliares (podem ser movidos para um arquivo types.ts se quiser)
type Genre = {
  id: number;
  title: string;
};

type BookGenre = {
  genre: Genre;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const book = await prisma.book.findUnique({
    where: { id },
    include: { genres: { include: { genre: true } } },
  });

  if (!book) {
    return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 });
  }

  // 🔧 Tipagem adicionada no map()
  const formattedBook = {
    ...book,
    genres: book.genres.map((bg: BookGenre) => bg.genre),
  };

  return NextResponse.json(formattedBook);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await request.json();
  const { genres, ...bookData } = body;

  const updatedBook = await prisma.book.update({
    where: { id },
    data: {
      ...bookData,
      genres: genres
        ? {
            deleteMany: {},
            // 🔧 Tipagem adicionada no map()
            create: genres.map((genre: { id: number }) => ({
              genre: { connect: { id: genre.id } },
            })),
          }
        : undefined,
    },
    include: { genres: { include: { genre: true } } },
  });

  const formattedBook = {
    ...updatedBook,
    genres: updatedBook.genres.map((bg: BookGenre) => bg.genre),
  };

  return NextResponse.json(formattedBook);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  await prisma.book.delete({ where: { id } });
  return NextResponse.json({ message: "Livro deletado com sucesso." });
}
