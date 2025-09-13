import { FormEvent, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    title?: string;
}
const API_URL = import.meta.env.VITE_API_BASE_URL + "/auth/register";
export default function LoginModal({ isOpen, onClose, title }: ModalProps) {
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const dataObject = Object.fromEntries(formData);
        const form = event.currentTarget;
        console.log("Form data: ", formData, " dataobje", dataObject)

        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(dataObject),
            headers: {
                "Content-Type": "application/json"
            },
        })
        form.reset();
        onClose();
    }
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);


    return createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title || "Title"}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Enter username:</label>
                    <input name="username" type="text" required />
                    <label htmlFor="password">Enter password:</label>
                    <input name="password" type="password" required />
                    <div className="modal-actions">
                        <input type="submit"></input>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div >,
        document.body
    );
}