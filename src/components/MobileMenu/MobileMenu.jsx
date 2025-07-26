import { useEffect } from 'react';
import s from './MobileMenu.module.css';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';

const handleActiveClass = ({ isActive }) => {
  return clsx(s.mobNavLink, isActive && s.active);
};

const MobileMenu = ({ isOpen, onCloseMobileMenu }) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCloseMobileMenu();
    }
  };

  useEffect(() => {
    const handleKeyDownClick = (e) => {
      if (e.key === 'Escape') {
        onCloseMobileMenu();
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
          <Link to="/" onClick={onCloseMobileMenu}>
            <img src="/logo.svg" alt="Logo" className={clsx(s.logo)} />
          </Link>

          <div className={clsx(s.tabCreateCloseContainer)}>
            {isLoggedIn ? (
              <NavLink
                to="/create"
                className={clsx(s.tabCreateLink)}
                onClick={onCloseMobileMenu}
              >
                Create an article
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className={clsx(s.tabJoinLink)}
                onClick={onCloseMobileMenu}
              >
                Join now
              </NavLink>
            )}
            <button
              onClick={onCloseMobileMenu}
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
            onClick={onCloseMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/articles"
            className={handleActiveClass}
            onClick={onCloseMobileMenu}
          >
            Articles
          </NavLink>
          <NavLink
            to="/authors"
            className={handleActiveClass}
            onClick={onCloseMobileMenu}
            end
          >
            Creators
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink
                to={'/profile'}
                className={handleActiveClass}
                onClick={onCloseMobileMenu}
              >
                My Profile
              </NavLink>
              <NavLink
                to="/create"
                className={clsx(s.mobCreateLink)}
                onClick={onCloseMobileMenu}
              >
                Create an article
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={handleActiveClass}
                onClick={onCloseMobileMenu}
              >
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className={clsx(s.mobJoinLink)}
                onClick={onCloseMobileMenu}
              >
                Join now
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <div className={clsx(s.avatarContainer)}>
              <div className={clsx(s.avatarNameContainer)}>
                <img
                  src="/avatar.png"
                  alt="Avatar"
                  className={clsx(s.avatar)}
                />
                <p className={clsx(s.name)}>Naomi</p>
              </div>
              <button
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
