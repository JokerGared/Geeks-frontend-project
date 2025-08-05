import clsx from 'clsx';
import s from './UserMenu.module.css';
import { NavLink } from 'react-router-dom';
import { openModal } from '../../redux/modal/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

const handleActiveClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};

const UserMenu = () => {
  const { name, avatarUrl } = useSelector(selectUser);

  const userAvatar = avatarUrl ? avatarUrl : '/images/default-avatar.png';

  const dispatch = useDispatch();

  const handleOpenConfirmExitModal = () => {
    dispatch(openModal({ type: 'modalLogoutConfirm' }));
  };

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
          <img src={userAvatar} alt="User avatar" className={clsx(s.avatar)} />
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
    </>
  );
};

export default UserMenu;
