import { Button, Typography } from '@mui/material';
import { JSX, useState } from 'react';
import { useBookContext } from '../hooks/useBooksContext';
import { Book } from '../models/Book';
import { CreateBookModal } from './CreateBookModal';
import RenderBook from './RenderBook';
import Search from './Search';



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
            createBook(book);
            setOpenCreateModal(false);
        } catch (error) {
            console.error("Failed to create book:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            deleteBook(id);
        } catch (error) {
            console.error("Failed to delete book:", error);
        }
    };

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '8px' }}>
            <Button onClick={() => setOpenCreateModal(true)}>Add Book</Button>
            <Search />
        </div>
        {openCreateModal && <CreateBookModal isOpen={openCreateModal} onClose={handleCloseModal} handleSubmit={handleSubmit} />}
        <div className='book-list-wrapper'>
            {books?.map((book: Book) => (
                <RenderBook book={book} handleDelete={handleDelete} isLoading={isLoading} />
            ))}
        </div>
    </ >
}