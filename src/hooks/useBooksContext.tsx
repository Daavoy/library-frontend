import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export function useBookContext() {
    const context = useContext(BooksContext);
    if (!context) {
        throw new Error("useBookContext must be used within a BookProvider");
    }
    return context;
}