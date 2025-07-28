import { Button, Typography } from '@mui/material';
import { JSX, useState } from 'react';
import { useBookContext } from '../hooks/useBooksContext';
import { Book } from '../models/Book';
import { CreateBookModal } from './CreateBookModal';
import RenderBook from './RenderBook';



export default function BookList(): JSX.Element {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const {
        books,
        isLoading,
        error,
        createBook,
        updateBook,
        deleteBook,
    } = useBookContext();

    const handleCloseModal = () => setOpenCreateModal(false);
    const handleSubmit = async (book: Partial<Book>) => {
        try {
            await createBook(book);
            setOpenCreateModal(false);
        } catch (error) {
            console.error("Failed to create book:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteBook(id);
        } catch (error) {
            console.error("Failed to delete book:", error);
        }
    };

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return <>

        <Button onClick={() => setOpenCreateModal(true)}>Add Book</Button>
        {openCreateModal && <CreateBookModal isOpen={openCreateModal} onClose={handleCloseModal} handleSubmit={handleSubmit} />}
        <div className='book-list-wrapper'>
            {books?.map((book: Book) => (

                <RenderBook book={book} handleDelete={handleDelete} isLoading={isLoading} />
            ))}
        </div>
    </ >
}