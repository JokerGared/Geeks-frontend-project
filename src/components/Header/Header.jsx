import s from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import Container from '../Container/Container';

const Header = () => {
  const isLoggedIn = true;

  return (
    <header>
      <Container>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </Container>
    </header>
  );
};

export default Header;
