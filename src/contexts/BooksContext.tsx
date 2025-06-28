import { createContext } from "react";
import { Book } from "../models/Book";

interface BookContextType {
    books: Book[] | null;
    isLoading: boolean;
    error: string | null;
    fetchBooks: () => Promise<void>;
    createBook: (book: Omit<Book, "id">) => Promise<void>;
    updateBook: (book: Book) => Promise<void>;
    deleteBook: (id: number) => Promise<void>;
}

export const BooksContext = createContext<BookContextType | undefined>(undefined);