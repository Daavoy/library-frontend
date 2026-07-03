import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../axios";
import { UserBook } from "../models/UserBooks";
import { UserBooksContext } from "./UserBooksContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL + "/me/library";

export const UserBooksProvider = ({ children }) => {
    const [userBooks, setUserBooks] = useState<UserBook[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserBooks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        await axiosInstance
            .get<UserBook[]>(API_BASE)
            .then(response => {
                const { data } = response;
                setUserBooks(data);
            })
            .catch((error: AxiosError) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchUserBooks();
    }, [fetchUserBooks]);

    const addUserBook = useCallback(
        (payload: {
            totalPages?: number;
            readingStatus?: string;
        }) => {
            axiosInstance
                .post(API_BASE, payload)
                .then(() => {
                    fetchUserBooks();
                })
                .catch((error: AxiosError) => {
                    setError(error.message);
                });
        },
        [fetchUserBooks]
    );

    const updateUserBook = useCallback(
        (id: number, updates: Partial<UserBook>) => {
            axiosInstance
                .put(`${API_BASE}/${id}`, updates)
                .then(() => {
                    fetchUserBooks();
                })
                .catch((error: AxiosError) => {
                    setError(error.message);
                });
        },
        [fetchUserBooks]
    );

    const deleteUserBook = useCallback(
        (id: number) => {
            axiosInstance
                .delete(`${API_BASE}/${id}`)
                .then(() => {
                    fetchUserBooks();
                })
                .catch((error: AxiosError) => {
                    setError(error.message);
                });
        },
        [fetchUserBooks]
    );

    return (
        <UserBooksContext.Provider
            value={{
                userBooks,
                isLoading,
                error,
                fetchUserBooks,
                addUserBook,
                updateUserBook,
                deleteUserBook,
            }}
        >
            {children}
        </UserBooksContext.Provider>
    );
};
