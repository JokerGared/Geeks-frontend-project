import clsx from 'clsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import s from './NotFound.module.css';
import Container from '../../components/Container/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <div className={clsx(s.notFoundTextContainer)}>
        <SectionTitle className={clsx(s.notFoundTitle)}>
          Oops! We can&apos;t find that page
        </SectionTitle>
        <div className={clsx(s.notFoundDescriptionContainer)}>
          <p className={clsx(s.notFoundDescription)}>
            It seems you've taken a wrong turn.
          </p>
          <p className={clsx(s.notFoundDescription)}>
            Don't worry...we'll help you get back home.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
