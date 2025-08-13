import { useEffect, useState } from 'react';
import s from './MobileMenu.module.css';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { selectModalType } from '../../redux/modal/selectors';
import { closeModal, openModal } from '../../redux/modal/slice';
import { MODALS } from '../../constants/modals';

const handleActiveClass = ({ isActive }) => {
  return clsx(s.mobNavLink, isActive && s.active);
};

const MobileMenu = () => {
  const { name, avatarUrl } = useSelector(selectUser);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const modalType = useSelector(selectModalType);
  const isOpen = modalType === MODALS.MOBILE_MENU;

  const dispatch = useDispatch();
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
    if (isOpen) {
      const timer = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleOpenConfirmExitModal = () => {
    handleCloseModal();
    dispatch(openModal({ type: 'modalLogoutConfirm' }));
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDownClick = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDownClick);
    return () => document.removeEventListener('keydown', handleKeyDownClick);
  }, []);

  return (
    <div
      className={clsx(s.mobileBackdrop, show && s.show)}
      onClick={handleBackDropClick}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={clsx(s.mobileMenu)}>
        <div className={clsx(s.logoCloseButtonContainer)}>
          <Link to="/" onClick={handleCloseModal}>
            <img src="/logo.svg" alt="Logo" className={clsx(s.logo)} />
          </Link>

          <div className={clsx(s.tabCreateCloseContainer)}>
            {isLoggedIn ? (
              <NavLink
                to="/create"
                className={clsx(s.tabCreateLink)}
                onClick={handleCloseModal}
              >
                Create an article
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className={clsx(s.tabJoinLink)}
                onClick={handleCloseModal}
              >
                Join now
              </NavLink>
            )}
            <button
              onClick={handleCloseModal}
              className={clsx(s.closeButton)}
              aria-label="Close mobile menu"
            >
              <svg
                width={32}
                height={32}
                className={clsx(s.closeIcon)}
                aria-hidden="true"
              >
                <use href="/icons.svg#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>

        <div className={clsx(s.mobNavLinkContainer)}>
          <NavLink
            to="/"
            className={handleActiveClass}
            onClick={handleCloseModal}
          >
            Home
          </NavLink>
          <NavLink
            to="/articles"
            className={handleActiveClass}
            onClick={handleCloseModal}
          >
            Articles
          </NavLink>
          <NavLink
            to="/authors"
            className={handleActiveClass}
            onClick={handleCloseModal}
            end
          >
            Creators
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink
                to={'/profile'}
                className={handleActiveClass}
                onClick={handleCloseModal}
              >
                My Profile
              </NavLink>
              <NavLink
                to="/create"
                className={clsx(s.mobCreateLink)}
                onClick={handleCloseModal}
              >
                Create an article
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={handleActiveClass}
                onClick={handleCloseModal}
              >
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className={clsx(s.mobJoinLink)}
                onClick={handleCloseModal}
              >
                Join now
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <div className={clsx(s.avatarContainer)}>
              <div className={clsx(s.avatarNameContainer)}>
                {avatarUrl ? (
                  <img className={s.avatar} src={avatarUrl} alt={name} />
                ) : (
                  <div className={s.fallbackAvatar}>
                    {name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                )}
                <p className={clsx(s.name)}>{name}</p>
              </div>
              <button
                onClick={handleOpenConfirmExitModal}
                type="button"
                className={clsx(s.exitButton)}
                aria-label="Exit from account"
              >
                <svg
                  width={24}
                  height={24}
                  className={clsx(s.exitIcon)}
                  aria-hidden="true"
                >
                  <use href="/icons.svg#icon-exit"></use>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
