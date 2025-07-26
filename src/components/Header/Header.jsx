import s from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import clsx from 'clsx';
import Container from '../Container/Container';

const Header = ({ onOpenMobileMenu }) => {
  return (
    <header className={clsx(s.header)}>
      <Container>
        <Navigation onOpenMobileMenu={onOpenMobileMenu} />
      </Container>
    </header>
  );
};

export default Header;
