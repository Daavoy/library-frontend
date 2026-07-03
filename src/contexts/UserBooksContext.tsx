import { createContext } from "react";
import { UserBook } from "../models/UserBooks";

interface UserBooksContextType {
    userBooks: UserBook[];
    isLoading: boolean;
    error: string | null;

    fetchUserBooks: () => void;
    addUserBook: (payload: {
        totalPages?: number;
        readingStatus?: string;
    }) => void;
    updateUserBook: (id: number, updates: Partial<UserBook>) => void;
    deleteUserBook: (id: number) => void;
}

export const UserBooksContext =
    createContext<UserBooksContextType | undefined>(undefined);
