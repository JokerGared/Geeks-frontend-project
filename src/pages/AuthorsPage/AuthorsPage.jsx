import s from './AuthorsPage.module.css';
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const AuthorsPage = () => {
  return (
    <section className={s.authorsPage}>
      <SectionTitle className={s.title}>Authors</SectionTitle>
      <AuthorsList />
    </section>
  );
};

export default AuthorsPage;
