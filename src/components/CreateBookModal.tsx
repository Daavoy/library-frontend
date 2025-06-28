import { Book } from "../models/Book";
import { FieldConfig } from "../types/fieldConfig"; // Ensure you import FieldConfig
import BasicModal from "./BasicModal";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (body: Partial<Book>) => Promise<void>;
}

export function CreateBookModal({ isOpen, onClose, handleSubmit }: IProps) {
    const bookFields: FieldConfig[] = [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
            placeholder: "e.g., The Great Gatsby",
            autoFocus: true,
        },
        {
            name: "author",
            label: "Author",
            type: "text",
            required: true,
            placeholder: "e.g., F. Scott Fitzgerald",
            fullWidth: true,
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            rows: 4,
            placeholder: "A brief summary of the book...",
            helperText: "Keep it concise, ideally under 200 words.",
        },
        {
            name: "publicationYear",
            label: "Publication Year",
            type: "number",
            defaultValue: new Date().getFullYear(),
            placeholder: "",
            fullWidth: false,
        },
        {
            name: "thumbnail",
            label: "Upload Image",
            type: "file",
            helperText: "Upload a cover image for the book.",
        },
    ];

    return (
        <BasicModal
            isOpen={isOpen}
            onClose={onClose}
            children={undefined}
            title={"Add New Book"}
            fields={bookFields}
            handleSubmit={handleSubmit}
        ></BasicModal>
    );
}