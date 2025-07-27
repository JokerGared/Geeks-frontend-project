import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ModalErrorSave.module.css';

const ModalErrorSave = ({ onClose }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
   
    const timer = setTimeout(() => setShow(true), 0);
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={`${s.modalBackdrop} ${show ? s.show : ''}`}
      onClick={onClose}
    >
      <div className={s.modalWindow} onClick={(e) => e.stopPropagation()}>
        <button
          className={s.modalClose}
          aria-label="Close modal"
          onClick={onClose}
        >
          <svg className={s.modalCloseSvg}>
            <use href="/icons.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className={s.modalTitle}>Error while saving</h2>
        <p className={s.modalText}>
          To save this article, you need to <br /> authorize first
        </p>
        <div className={s.modalActions}>
          <button
            onClick={() => navigate('/login')}
            className={s.modalBtnLogin}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className={s.modalBtnRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalErrorSave;
