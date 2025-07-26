import clsx from 'clsx';
import s from './AuthNav.module.css';
import { NavLink } from 'react-router-dom';

const handleActiveClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};

const AuthNav = () => {
  return (
    <div className={clsx(s.deskAuthNav)}>
      <NavLink to='/login' className={handleActiveClass}>
        Log in
      </NavLink>
      <NavLink to='/register' className={clsx(s.joinLink)}>
        Join now
      </NavLink>
    </div>
  );
};

export default AuthNav;
