import clsx from 'clsx';
import s from './UserMenu.module.css';
import { NavLink } from 'react-router-dom';

const handleActiveClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};

const UserMenu = () => {
  return (
    <>
      <NavLink to={`/profile`} className={handleActiveClass}>
        My Profile
      </NavLink>
      <NavLink to="/create" className={clsx(s.createLink)}>
        Create an article
      </NavLink>

      <div className={clsx(s.avatarContainer)}>
        <div className={clsx(s.avatarNameContainer)}>
          <img src="" alt="Avatar" className={clsx(s.avatar)} />
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
    </>
  );
};

export default UserMenu;
