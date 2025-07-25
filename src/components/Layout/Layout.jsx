import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from '../Container/Container';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Suspense fallback={<div>Завантаження...</div>}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
