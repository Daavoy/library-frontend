import { useState } from "react";
import LoginModal from "./LoginModal";


export default function LoginPage() {
    const [openLoginModal, setOpenCreateModal] = useState<boolean>(false);


    const handleCloseModal = () => setOpenCreateModal(false);

    return (
        <div className="login-container">
            <button onClick={() => setOpenCreateModal(true)}>login</button>
            {openLoginModal && <LoginModal isOpen={openLoginModal} onClose={handleCloseModal} />}

        </div>
    )
}