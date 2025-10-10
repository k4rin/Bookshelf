export type BookStatus = 'TO_READ' | 'READING' | 'READ' | 'PAUSED' | 'FINISHED' | 'ABANDONED';

export interface Book {
  id: number;
  title: string;
  author: string;
  status: BookStatus;
  pages?: number;
  currentPage?: number;
  totalPages?: number;
  rating?: number;
  coverUrl?: string;
  synopsis?: string;
  createdAt: Date;
  isbn?: number;
  notes?: string;
  genres: Genre[];
}

export interface Genre {
  id: number;
  title: string;
  description?: string;
}

export interface GenreWithBook extends Genre {
  bookId?: number;
  book?: Book;
}

export type BookFormData = Omit<Book, 'id' | 'createdAt'>;