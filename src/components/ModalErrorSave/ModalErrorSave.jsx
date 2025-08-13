import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import s from './ModalErrorSave.module.css';
import { closeModal } from '../../redux/modal/slice';
import { selectModalPayload } from '../../redux/modal/selectors';

const ModalErrorSave = () => {
  const message = useSelector(selectModalPayload);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleCloseModal = () => {
    setClosing(true);
    setShow(false);
  };

  const handleTransitionEnd = () => {
    if (closing) {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    const timer = requestAnimationFrame(() => setShow(true));
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dispatch(closeModal());
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const handleNavigate = (path) => {
    handleCloseModal();
    navigate(path);
  };

  return (
    <div
      className={`${s.modalBackdrop} ${show ? s.show : ''}`}
      onClick={handleCloseModal}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={s.modalWindow} onClick={(e) => e.stopPropagation()}>
        <button
          className={s.modalClose}
          aria-label="Close modal"
          onClick={handleCloseModal}
        >
          <svg className={s.modalCloseSvg}>
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>
        <h2 className={s.modalTitle}>{message.header}</h2>
        <p
          className={s.modalText}
          dangerouslySetInnerHTML={{ __html: message.text }}
        />
        <div className={s.modalActions}>
          <button
            onClick={() => handleNavigate('/login')}
            className={s.modalBtnLogin}
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate('/register')}
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
