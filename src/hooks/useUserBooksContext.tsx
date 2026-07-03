import { useContext } from "react";
import { UserBooksContext } from "../contexts/UserBooksContext";

export function useBookContext() {
    const context = useContext(UserBooksContext);
    if (!context) {
        throw new Error("useBookContext must be used within a BookProvider");
    }
    return context;
}