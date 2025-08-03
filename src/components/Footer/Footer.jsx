import clsx from 'clsx';
import s from './Footer.module.css';
import { Link, useLocation } from 'react-router-dom';
import Container from '../Container/Container';

const Footer = () => {
  const { pathname } = useLocation();

  const hiddenPath = ['/register', '/photo', '/login'];
  const visibleAccountLink = !hiddenPath.includes(pathname);

  return (
    <footer className={clsx(s.footer)}>
      <Container className={clsx(s.footerContainer)}>
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className={clsx(s.footerLogo)} />
        </Link>

        <p className={clsx(s.footerRights)}>
          &copy; 2025 Harmoniq. All rights reserved.
        </p>

        <nav className={clsx(s.footerNavLinkContainer)}>
          <Link to="/articles" className={clsx(s.footerLink)}>
            Articles
          </Link>

          {visibleAccountLink && (
            <Link to={'/my-profile'} className={clsx(s.footerLink)}>
              Account
            </Link>
          )}
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
