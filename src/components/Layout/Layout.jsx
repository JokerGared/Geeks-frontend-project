import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from '../Container/Container';
import MobileMenu from '../MobileMenu/MobileMenu';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMobileMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Header onOpenMobileMenu={handleOpenMobileMenu} />
      <main>
        <Container>
          <Suspense fallback={<div>Завантаження...</div>}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Footer />
      <MobileMenu isOpen={isOpen} onCloseMobileMenu={handleCloseMobileMenu} />
    </>
  );
};

export default Layout;
