import s from './AuthorsPage.module.css';
import AuthorsList from '../../components/AuthorsList/AuthorsList';

const AuthorsPage = () => {
  return (
    <div>
      <h2>Authors</h2>
      <AuthorsList />
    </div>
  );
};

export default AuthorsPage;
