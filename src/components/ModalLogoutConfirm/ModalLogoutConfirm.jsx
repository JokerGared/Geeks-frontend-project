import s from "./ModalAddArticle.module.css";
import { useEffect, useState } from "react";

const ModalAddArticle = ({ onClose, onConfirm }) => {
        const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 0);

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className={`${s.modalBackdrop} ${show ? s.show : ""}`} onClick={onClose}>
            <div className={s.modalWindow} onClick={(e) => e.stopPropagation()}>
                <button className={s.modalClose} aria-label="Close modal" onClick={onClose}>
                    <svg className={s.modalCloseSvg}>
                        <use href="/icons.svg#icon-close"></use>
                    </svg>
                </button>
                <h2 className={s.modalTitle}>Are you shure?</h2>
                <p className={s.modalText}>We will miss you!</p>
                <div className={s.modalActions}>
                    <button onClick={onConfirm}  className={s.modalBtnRegister}>
                        Log out
                    </button>
                    <button onClick={onClose} className={s.modalBtnLogin}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAddArticle;
