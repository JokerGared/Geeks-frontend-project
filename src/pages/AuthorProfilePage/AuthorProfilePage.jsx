import s from './AuthorProfilePage.module.css';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import { NavLink, Outlet } from 'react-router-dom';

const AuthorProfilePage = () => {
  // const authorId = useParams();
  // const currentUserId = useSelector(selectUserId);

  const authorId = '123';
  const currentUserId = '123';

  const isCurrentUserProfile = authorId === currentUserId;
  return (
    <div>
      <h2>Author's articles</h2>

      {isCurrentUserProfile && (
        <>
          <nav>
            <NavLink to='my-articles'>My Articles</NavLink>
            <NavLink to='saved'>Saved Articles</NavLink>
          </nav>
          <Outlet />
        </>
      )}

      {!isCurrentUserProfile && <ArticlesList />}
    </div>
  );
};

export default AuthorProfilePage;
