import s from './AuthorProfilePage.module.css';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import { NavLink, Outlet } from 'react-router-dom';
import MyProfile from '../MyProfile/MyProfile';

const AuthorProfilePage = () => {
  // const { authorId } = useParams();
  // const currentUserId = useSelector(selectUserId);

  const authorId = '1';
  const currentUserId = '123';

  const isCurrentUserProfile = authorId === currentUserId;
  return (
    <div>
      <h2>Author's articles</h2>

      {isCurrentUserProfile ? <MyProfile /> : <ArticlesList />}
    </div>
  );
};

export default AuthorProfilePage;
