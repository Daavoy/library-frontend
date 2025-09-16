import { useState } from "react";
import RegisterLoginModal from "./RegisterLoginModal";



export default function RegisterPage() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

    const handleOnClose = () => {
        setIsRegisterModalOpen(false);
    }
    return <div className="register-wrapper">
        {isRegisterModalOpen && <RegisterLoginModal isOpen={isRegisterModalOpen} onClose={handleOnClose} title="Register" />}
        <button onClick={() => setIsRegisterModalOpen(true)} className="register-button">Register</button>
    </div>
}