import s from "./ModalLogoutConfirm.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../redux/modal/slice";
import { logOut } from "../../redux/auth/operations";

const ModalLogoutConfirm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = requestAnimationFrame(() => setShow(true));
        const handleKeyDown = (e) => {
            if (e.key === "Escape") dispatch(closeModal());
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            cancelAnimationFrame(timer);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            await dispatch(logOut()).unwrap();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            dispatch(closeModal());
            navigate("/login");
        }
    };

    const handleCancel = () => {
        dispatch(closeModal());
    };

    return (
        <div className={`${s.modalBackdrop} ${show ? s.show : ""}`} onClick={handleCancel}>
            <div className={s.modalWindow} onClick={(e) => e.stopPropagation()}>
                <button className={s.modalClose} aria-label="Close modal" onClick={handleCancel}>
                    <svg className={s.modalCloseSvg}>
                        <use href="/icons.svg#icon-close"></use>
                    </svg>
                </button>
                <h2 className={s.modalTitle}>Are you sure?</h2>
                <p className={s.modalText}>We will miss you!</p>
                <div className={s.modalActions}>
                    <button onClick={handleLogout} className={s.modalBtnRegister}>
                        Log out
                    </button>
                    <button onClick={handleCancel} className={s.modalBtnLogin}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalLogoutConfirm;
