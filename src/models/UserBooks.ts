import { Book } from "./Book";

export interface UserBook {
    id: number;
    book: Book;
    isFavorite: boolean

    readingStatus: "PLANNED" | "READING" | "COMPLETED";
    currentPage?: number;
    rating?: number;
    startedAt?: Date;
    finishedAt?: Date;
    notes?: string;
}