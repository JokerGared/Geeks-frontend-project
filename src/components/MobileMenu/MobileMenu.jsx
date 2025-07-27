import { useEffect } from 'react';
import s from './MobileMenu.module.css';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectModalType } from '../../redux/modal/selectors';
import { closeModal, openModal } from '../../redux/modal/slice';
import { MODALS } from '../../constants/modals';

const handleActiveClass = ({ isActive }) => {
  return clsx(s.mobNavLink, isActive && s.active);
};

const MobileMenu = () => {
  const avatar = 'https://i.pravatar.cc/150?img=5';

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const modalType = useSelector(selectModalType);
  const isOpen = modalType === MODALS.MOBILE_MENU;

  const dispatch = useDispatch();

  const handleCloseMobileMenu = () => {
    dispatch(closeModal());
  };

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseMobileMenu();
    }
  };

  const handleOpenConfirmExitModal = () => {
    dispatch(openModal({ type: 'modalLogoutConfirm' }));
    handleCloseMobileMenu();
  };

  useEffect(() => {
    const handleKeyDownClick = (e) => {
      if (e.key === 'Escape') {
        handleCloseMobileMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDownClick);
    return () => document.removeEventListener('keydown', handleKeyDownClick);
  }, []);

  return (
    <div
      className={clsx(s.mobileBackdrop, isOpen && s.isOpen)}
      onClick={handleBackDropClick}
    >
      <div className={clsx(s.mobileMenu)}>
        <div className={clsx(s.logoCloseButtonContainer)}>
          <Link to="/" onClick={handleCloseMobileMenu}>
            <img src="/logo.svg" alt="Logo" className={clsx(s.logo)} />
          </Link>

          <div className={clsx(s.tabCreateCloseContainer)}>
            {isLoggedIn ? (
              <NavLink
                to="/create"
                className={clsx(s.tabCreateLink)}
                onClick={handleCloseMobileMenu}
              >
                Create an article
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className={clsx(s.tabJoinLink)}
                onClick={handleCloseMobileMenu}
              >
                Join now
              </NavLink>
            )}
            <button
              onClick={handleCloseMobileMenu}
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
            onClick={handleCloseMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/articles"
            className={handleActiveClass}
            onClick={handleCloseMobileMenu}
          >
            Articles
          </NavLink>
          <NavLink
            to="/authors"
            className={handleActiveClass}
            onClick={handleCloseMobileMenu}
            end
          >
            Creators
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink
                to={'/profile'}
                className={handleActiveClass}
                onClick={handleCloseMobileMenu}
              >
                My Profile
              </NavLink>
              <NavLink
                to="/create"
                className={clsx(s.mobCreateLink)}
                onClick={handleCloseMobileMenu}
              >
                Create an article
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={handleActiveClass}
                onClick={handleCloseMobileMenu}
              >
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className={clsx(s.mobJoinLink)}
                onClick={handleCloseMobileMenu}
              >
                Join now
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <div className={clsx(s.avatarContainer)}>
              <div className={clsx(s.avatarNameContainer)}>
                <img src={avatar} alt="Avatar" className={clsx(s.avatar)} />
                <p className={clsx(s.name)}>Naomi</p>
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
