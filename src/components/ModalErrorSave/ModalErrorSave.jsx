import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import s from "./ModalErrorSave.module.css";
import { closeModal } from "../../redux/modal/slice";

const ModalErrorSave = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = requestAnimationFrame(() => setShow(true));
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                dispatch(closeModal());
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            cancelAnimationFrame(timer);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);

    const handleNavigate = (path) => {
        dispatch(closeModal());
        requestAnimationFrame(() => navigate(path));
    };

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <div className={`${s.modalBackdrop} ${show ? s.show : ""}`} onClick={handleClose}>
            <div className={s.modalWindow} onClick={(e) => e.stopPropagation()}>
                <button className={s.modalClose} aria-label="Close modal" onClick={handleClose}>
                    <svg className={s.modalCloseSvg}>
                        <use href="/icons.svg#icon-close" />
                    </svg>
                </button>
                <h2 className={s.modalTitle}>Error while saving</h2>
                <p className={s.modalText}>
                    To save this article, you need to <br /> authorize first
                </p>
                <div className={s.modalActions}>
                    <button onClick={() => handleNavigate("/login")} className={s.modalBtnLogin}>
                        Login
                    </button>
                    <button onClick={() => handleNavigate("/register")} className={s.modalBtnRegister}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalErrorSave;
