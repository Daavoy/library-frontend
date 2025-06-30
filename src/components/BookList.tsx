import { Button, Grid, Typography } from '@mui/material';
import { JSX, useState } from 'react';
import { useBookContext } from '../hooks/useBooksContext';
import { Book } from '../models/Book';
import { CreateBookModal } from './CreateBookModal';



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
        {books?.map((book: Book) => (
            <Grid container spacing={2} key={book.id}>
                {Object.entries(book).map(([key, value]) =>
                    key !== 'id' && (
                        <Grid key={`${book.id}-${key}`} size={4}>
                            <>
                                {key === 'thumbnail' && value ? <img
                                    src={`data:image/jpeg;base64,${value}`}
                                    alt={`Thumbnail for ${book.title}`}
                                    style={{ width: "150px", height: "auto" }}
                                /> : <div>{value}</div>}
                            </>
                        </Grid>
                    ))
                }
                <Button
                    onClick={() => handleDelete(book.id)}
                    disabled={isLoading}>
                    Remove
                </Button>
            </Grid>
        ))}
    </ >
}