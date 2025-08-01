import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from '../Container/Container';
import MobileMenu from '../MobileMenu/MobileMenu';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import s from './Layout.module.css';

const Layout = () => {
  return (
    <div className={s.layout}>
      <ScrollToTop />
      <Header />
      <main>
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Footer />
      <MobileMenu />
    </div>
  );
};

export default Layout;
