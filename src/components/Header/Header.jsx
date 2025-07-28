import s from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import clsx from 'clsx';
import Container from '../Container/Container';

const Header = () => {
  return (
    <header className={clsx(s.header)}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
