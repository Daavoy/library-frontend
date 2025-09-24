import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./RegisterLoginModal";

export default function LoginPage() {
    const [openLoginModal, setOpenCreateModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setOpenCreateModal(false)
        navigate("/")
    };

    return (
        <div className="login-container">
            <button className="login-button" onClick={() => setOpenCreateModal(true)}>Login</button>
            {openLoginModal && <LoginModal isOpen={openLoginModal} onClose={handleCloseModal} title="Login" />}
        </div>
    )
}