import { Book } from "../models/Book";
import RatingComponent from "./RatingComponent";


interface IProps {
    book: Book;
    handleDelete: (id: number) => Promise<void>;
    isLoading: boolean;
}

export default function RenderBook({ book, handleDelete, isLoading }: IProps) {
    const { title, author, description, isbn, thumbnail } = book;

    return <div className="book-wrapper">
        <div className="book-header">
            <img
                className="book-thumbnail-img"
                src={`data:image/jpeg;base64,${thumbnail}`}
                alt={`Thumbnail for ${book.title}`} />
            <h2>{title}</h2>
        </div>
        <div className="book-details">
            {description && <div>{description}</div>}
            {author && <div>{author}</div>}
            {isbn && <div>{isbn}</div>}
        </div>
        <div className="book-footer">
            <RatingComponent />
            <button onClick={() => handleDelete(book.id)}>delete</button>
        </div>

    </div>
}