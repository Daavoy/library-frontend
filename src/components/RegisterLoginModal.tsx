import { FormEvent, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { AuthPayload, login, register } from "../auth/AuthUtil";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    title?: string;
    isRegisterModal?: boolean;
}


export default function RegisterLoginModal({ isOpen, onClose, title, isRegisterModal }: ModalProps) {
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        //TODO FIX THIS STUPID SHIT
        const dataObject = Object.fromEntries(formData) as unknown as AuthPayload;
        if (isRegisterModal) {
            await register(dataObject)
        } else {
            await login(dataObject);
        }
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
                        <input type="submit" />
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