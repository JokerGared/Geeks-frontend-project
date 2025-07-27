import s from './AuthorsPage.module.css';
import AuthorsList from '../../components/AuthorsList/AuthorsList';

const AuthorsPage = () => {
  return (
    <section className={s.authorsPage}>
      <h2 className={s.title}>Authors</h2>
      <AuthorsList />
    </section>
  );
};

export default AuthorsPage;
