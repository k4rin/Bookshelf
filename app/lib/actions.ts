'use server'

import { revalidatePath } from 'next/cache';
import { Book } from '@/app/types/book';

// Teste
// Função auxiliar para construir URLs absolutas
const BASE_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

// Server action to create a new book
export async function addBook(book: Omit<Book, 'id' | 'createdAt'>) {
    try {
        if (!book.title || !book.author || !book.status) {
            throw new Error('Título, autor e status são obrigatórios');
        }

        const response = await fetch(`${BASE_URL}/api/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                error: 'Erro na resposta do servidor',
                details: `Status: ${response.status}`
            }));

            if (response.status === 400) {
                throw new Error(errorData.error || 'Dados inválidos fornecidos');
            } else if (response.status === 500) {
                throw new Error(errorData.error + (errorData.details ? `: ${errorData.details}` : ''));
            } else {
                throw new Error(errorData.error || 'Erro ao adicionar livro');
            }
        }

        revalidatePath('/books');
        const newBook = await response.json();
        return newBook;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error instanceof Error ? error : new Error('Erro ao adicionar livro');
    }
}

// Server action to update a book
export async function updateBook(id: string, book: Partial<Book>) {
    // Converter genreIds para o formato esperado pela API
    const payload: any = { ...book };
    if ('genreIds' in payload && Array.isArray(payload.genreIds)) {
        payload.genres = payload.genreIds.map((id: number) => ({ id }));
        delete payload.genreIds;
    }

    const response = await fetch(`${BASE_URL}/api/books/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to update book');
    }

    revalidatePath('/books');
    revalidatePath(`/books/${id}`);
    return response.json();
}

// Server action to delete a book
export async function deleteBook(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
            if (response.status === 404) {
                throw new Error('Livro não encontrado');
            } else {
                throw new Error(errorData.error || 'Erro ao excluir o livro');
            }
        }

        revalidatePath('/books');
        return true;
    } catch (error) {
        console.error('Error deleting book:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Erro ao excluir o livro. Por favor, tente novamente.');
    }
}

// Server action to get a book by ID
export async function getBook(id: string) {
    const response = await fetch(`${BASE_URL}/api/books/${id}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Book not found');
    }

    return response.json();
}

// Server action to get all books
export async function getBooks() {

    try {
        const response = await fetch(`${BASE_URL}/api/books`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error("DEBUG MODE: Retornando lista vazia. O fetch real foi desabilitado.");
            let errorMessage = `Failed to fetch books (${response.status})`;

            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorData.details || errorMessage;
            } catch {
                // Se não conseguir parsear JSON, tenta texto
                const errorText = await response.text().catch(() => '');
                if (errorText) errorMessage = errorText;
            }

            throw new Error(errorMessage);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch books');
    }
}

// Server action to get all genres
export async function getGenres() {
    const response = await fetch(`${BASE_URL}/api/genres`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch genres');
    }

    return response.json();
}

// Server action to add a new genre
export async function addGenre(genre: string) {
    const response = await fetch(`${BASE_URL}/api/genres`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genre }),
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to add genre');
    }

    revalidatePath('/books');
    return response.json();
}

// Server action to delete a genre
export async function deleteGenre(genre: string) {
    const response = await fetch(
        `${BASE_URL}/api/genres/${encodeURIComponent(genre)}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        }
    );

    if (!response.ok) {
        throw new Error('Failed to delete genre');
    }

    revalidatePath('/books');
    return true;
}