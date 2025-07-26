import s from './AuthorProfilePage.module.css';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import MyProfile from '../MyProfile/MyProfile';

const AuthorProfilePage = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      <h2>Author's articles</h2>

      {isLoggedIn ? <MyProfile /> : <ArticlesList />}
    </div>
  );
};

export default AuthorProfilePage;
