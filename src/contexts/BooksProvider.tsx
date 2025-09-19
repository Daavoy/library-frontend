import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../axios";
import { Book } from "../models/Book";
import { BooksContext } from "./BooksContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/books";
export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        await axiosInstance.get<Book[]>(API_BASE).then(response => {
            const { data } = response;
            setBooks(data);
        }).catch((error: AxiosError) => {
            setError(error.message);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks])
    const createBook = useCallback(
        (book: Omit<Book, "id"> & { thumbnail?: File }) => {
            const formData = new FormData();
            Object.entries(book).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    if (value instanceof File) {
                        formData.append(key, value);
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });
            axiosInstance
                .post(API_BASE, formData, { headers: { "Content-Type": "multipart/form-data" } })
                .then(() => {
                    fetchBooks();
                })
                .catch((error: AxiosError) => {
                    setError(error.message);
                });
        },
        [fetchBooks]
    );
    const updateBook = useCallback(
        (book: Book & { thumbnail?: File }) => {
            const formData = new FormData();
            Object.entries(book).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    if (value instanceof File) {
                        formData.append(key, value);
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });
            axiosInstance
                .put(`${API_BASE}/${book.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
                .then(() => {
                    fetchBooks();
                })
                .catch((err: AxiosError) => {
                    setError(err.message);
                });
        },
        [fetchBooks]
    );
    const deleteBook = useCallback(
        (id: number) => {
            axiosInstance
                .delete(`${API_BASE}/${id}`)
                .then(() => {
                    fetchBooks();
                })
                .catch((err: AxiosError) => {
                    setError(err.message);
                });
        },
        [fetchBooks]
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


