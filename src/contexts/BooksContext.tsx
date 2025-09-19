import { createContext } from "react";
import { Book } from "../models/Book";

interface BookContextType {
    books: Book[];
    isLoading: boolean;
    error: string | null;
    fetchBooks: () => void;
    createBook: (book: Omit<Book, "id"> & { thumbnail?: File }) => void;
    updateBook: (book: Book & { thumbnail?: File }) => void;
    deleteBook: (id: number) => void;
}

export const BooksContext = createContext<BookContextType | undefined>(undefined);