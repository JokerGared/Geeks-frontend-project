import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from '../Container/Container';
import MobileMenu from '../MobileMenu/MobileMenu';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import s from './Layout.module.css';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';
import ModalLogoutConfirm from '../ModalLogoutConfirm/ModalLogoutConfirm';
import { useSelector } from 'react-redux';
import {
  selectIsModalOpen,
  selectModalType,
} from '../../redux/modal/selectors';
import { MODALS } from '../../constants/modals';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const modalType = useSelector(selectModalType);
  const modalIsOpen = useSelector(selectIsModalOpen);

  const ErrorSaveIsOpen = modalType === MODALS.MODAL_ERROR_SAVE && modalIsOpen;
  const LogoutConfirmIsOpen =
    modalType === MODALS.MODAL_LOGOUT_CONFIRM && modalIsOpen;
  const mobileMenuIsOpen = MODALS.MOBILE_MENU && modalIsOpen;

  useEffect(() => {
    if (modalIsOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      return () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      };
    }
  }, [modalIsOpen]);

  return (
    <div className={s.layout}>
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <main>
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Footer />

      {ErrorSaveIsOpen && <ModalErrorSave />}
      {LogoutConfirmIsOpen && <ModalLogoutConfirm />}
      {mobileMenuIsOpen && <MobileMenu />}
    </div>
  );
};

export default Layout;
