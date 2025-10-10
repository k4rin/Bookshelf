export type BookStatus = "TO_READ" | "READING" | "READ" | "PAUSED" | "FINISHED" | "ABANDONED"

export interface Book {
  id: number;
  createdAt: Date;
  title: string;
  author: string;
  status: BookStatus;
  genres: Genre[];
  pages?: number;
  currentPage?: number;
  totalPages?: number;
  rating?: number;
  coverUrl?: string;
  synopsis?: string;
  isbn?: number;
  notes?: string;
}

export interface Genre {
  id: number;
  title: string;
  description?: string;
  bookId: number;
  book: Book;
}

