// app/api/genres/route.ts
import prisma from "../../lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
    const genres = await prisma.genre.findMany({
        orderBy: { title: 'asc' },
    });
    return NextResponse.json(genres);
}

export async function POST(request: Request) {
    const { title, description } = await request.json();
    const newGenre = await prisma.genre.create({
        data: { title, description },
    });
    return NextResponse.json(newGenre, { status: 201 });
}