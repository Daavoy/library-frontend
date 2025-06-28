import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ReactNode, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Book } from "../models/Book";
import { FieldConfig } from "../types/fieldConfig";
import { Tooltip } from "./Tooltip";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    title?: string;
    fields: FieldConfig[]
    handleSubmit: (body: Partial<Book>) => Promise<void>;

}

export default function BasicModal({ isOpen, onClose, children, title, fields, handleSubmit }: ModalProps) {
    const initialFormState = useMemo(() => {
        return Object.fromEntries(
            fields.map((field) => [field.name, field.defaultValue || ""])
        );
    }, [fields]); const [formData, setFormData] = useState<Record<string, unknown>>(initialFormState);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormState);
            setErrors({});
        }
    }, [initialFormState, isOpen]);
    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        for (const field of fields) {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required.`;
            }
            if (field.type === 'email' && formData[field.name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name] as string)) {
                newErrors[field.name] = 'Please enter a valid email address.';
            }
            if (field.type === 'number' && formData[field.name] && isNaN(Number(formData[field.name]))) {
                newErrors[field.name] = 'Please enter a valid number.';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
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
    const onSave = async (event: React.FormEvent) => {
        event.preventDefault();

        if (validate()) {
            try {
                await handleSubmit(formData as Partial<Book>);
                console.log("Form data submitted successfully:", formData);
                setFormData(initialFormState);
                setErrors({});
                onClose();
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        } else {
            console.log("Validation failed. Errors:", errors);
        }
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log("event", event.target, ' cr', event.currentTarget)
        if (event.target === event.currentTarget) {
            onClose();
        }
    };



    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title || "Modal Title"}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <form onSubmit={onSave}>
                    {fields.map((field) => (
                        <div className="form-group" key={field.name}>
                            <label htmlFor={field.name} className={field.type === "file" ? "custom-file-upload" : ""}>
                                <span>
                                    {field.label}
                                    {field.required && <span className="required-star">*</span>}
                                </span>
                            </label>
                            {field.helperText && (
                                <Tooltip tooltipText={field.helperText}>
                                    <InfoOutlinedIcon className="tooltip-icon" fontSize='small' />
                                </Tooltip>
                            )}
                            <input
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] as string}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                required={field.required}
                                autoFocus={field.autoFocus}
                            />
                            {errors[field.name] && (
                                <p className="error-message">{errors[field.name]}</p>
                            )}
                        </div>
                    ))}
                    <div className="modal-actions">
                        <button type="submit">Submit</button>
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
