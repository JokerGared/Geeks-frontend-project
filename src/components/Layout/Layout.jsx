import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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
        <Suspense fallback={<div>Завантаження...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
