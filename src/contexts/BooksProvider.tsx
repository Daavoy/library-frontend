import { useCallback, useMemo } from "react";
import useFetch, { HTTPMethod } from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import { Book } from "../models/Book";
import { BooksContext } from "./BooksContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/books";
console.log("API: ", API_BASE)
export const BookProvider = ({ children }) => {
    const fetchOpts = useMemo(() => ({ method: HTTPMethod.GET }), []);

    const { data: books, isLoading, error, refetch } = useFetch<Book[]>(API_BASE, fetchOpts);

    const fetchBooks = useCallback(async () => {
        await refetch();
    }, [refetch]);

    const { mutate: createBookMutate } = useMutation<null, FormData>(
        API_BASE,
        { method: HTTPMethod.POST }
    );

    const { mutate: updateBookMutate } = useMutation<null, Book>(
        API_BASE,
        { method: HTTPMethod.PUT }
    );

    const { mutate: deleteBookMutate } = useMutation<null, undefined>(
        API_BASE,
        { method: HTTPMethod.DELETE }
    );

    const createBook = useCallback(
        async (book: Omit<Book, "id"> & { thumbnail?: File }) => {
            const formData = new FormData();

            Object.entries(book).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (value instanceof File) {
                        formData.append(key, value);
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });

            await createBookMutate(formData);
            await fetchBooks();
        },
        [createBookMutate, fetchBooks]
    );

    const updateBook = useCallback(
        async (book: Book) => {
            await updateBookMutate(book, `/${book.id}`);
            await fetchBooks();
        },
        [updateBookMutate, fetchBooks]
    );

    const deleteBook = useCallback(
        async (id: number) => {
            await deleteBookMutate(undefined, `/${id}`);
            await fetchBooks();
        },
        [deleteBookMutate, fetchBooks]
    );

    return (
        <BooksContext.Provider
            value={{
                books,
                isLoading,
                error,
                fetchBooks,
                createBook,
                updateBook,
                deleteBook,
            }}
        >
            {children}
        </BooksContext.Provider>
    );
};
