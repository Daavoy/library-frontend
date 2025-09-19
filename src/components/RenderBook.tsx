import { Book } from "../models/Book";


interface IProps {
    book: Book;
    handleDelete: (id: number) => Promise<void>;
    isLoading: boolean;
}

export default function RenderBook({ book, handleDelete, isLoading }: IProps) {
    const { title, author, description, isbn, thumbnail } = book;

    return <div className="book-wrapper">
        <img
            className="book-thumbnail-img"
            src={`data:image/jpeg;base64,${thumbnail}`}
            alt={`Thumbnail for ${book.title}`} />
        <h2>{title}</h2>
        <div className="book-details">
            {description && <span>{description}</span>}
            {author && <span>{author}</span>}
            {isbn && <span>{isbn}</span>}
        </div>
        <button onClick={() => handleDelete(book.id)}>delete</button>

    </div>
}