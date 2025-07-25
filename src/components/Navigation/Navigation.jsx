import clsx from 'clsx';
import s from './Navigation.module.css';
import { NavLink, Link, useParams } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';

const handleActiveClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};

const Navigation = ({ onOpenMobileMenu }) => {
  const isLoggedIn = true;

  return (
    <nav className={clsx(s.nav)}>
      <Link to='/'>
        <img src='/logo.svg' alt='Logo' />
      </Link>

      <div className={clsx(s.joinLinkCreateBurgerContainer)}>
        {isLoggedIn && (
          <NavLink to='/create' className={clsx(s.createLink)}>
            Create an article
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink to='/register' className={clsx(s.joinLink)}>
            Join now
          </NavLink>
        )}

        <button
          onClick={onOpenMobileMenu}
          className={clsx(s.burgerButton)}
          aria-label='Open mobile menu'
        >
          <svg width={32} height={32} className={clsx(s.burgerIcon)} aria-hidden='true'>
            <use href='/icons.svg#icon-burger'></use>
          </svg>
        </button>
      </div>

      <div className={clsx(s.linkUserMenuAuthNavContainer)}>
        <NavLink to='/' className={handleActiveClass}>
          Home
        </NavLink>
        <NavLink to='/articles' className={handleActiveClass}>
          Articles
        </NavLink>
        <NavLink to='/authors' className={handleActiveClass} end>
          Creators
        </NavLink>

        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </div>
    </nav>
  );
};

export default Navigation;
