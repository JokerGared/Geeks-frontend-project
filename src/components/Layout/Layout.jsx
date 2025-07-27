import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from '../Container/Container';
import MobileMenu from '../MobileMenu/MobileMenu';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

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
      <ScrollToTop />
      <Header onOpenMobileMenu={handleOpenMobileMenu} />
      <main>
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
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
