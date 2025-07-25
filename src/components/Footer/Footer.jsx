import clsx from 'clsx';
import s from './Footer.module.css';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';

const Footer = () => {
  return (
    <footer className={clsx(s.footer)}>
      <Container className={clsx(s.footerContainer)}>
        <Link to='/'>
          <img src='/logo.svg' alt='Logo' className={clsx(s.footerLogo)} />
        </Link>

        <p className={clsx(s.footerRights)}>&copy; 2025 Harmoniq. All rights reserved.</p>

        <nav className={clsx(s.footerNavLinkContainer)}>
          <Link to='/articles' className={clsx(s.footerLink)}>
            Articles
          </Link>

          <Link to={'/profile'} className={clsx(s.footerLink)}>
            Account
          </Link>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
