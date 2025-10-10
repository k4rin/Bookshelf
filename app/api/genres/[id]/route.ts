// app/api/genres/[id]/route.ts
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);

    // O schema do Prisma com `onDelete: Cascade` já cuida da remoção em `BookGenres`
    await prisma.genre.delete({
        where: { id },
    });

    return NextResponse.json({ message: "Gênero deletado com sucesso" });
}