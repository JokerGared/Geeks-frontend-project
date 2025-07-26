import s from './AuthorProfilePage.module.css';
import MyProfile from '../MyProfile/MyProfile';
import PublicProfile from '../../components/PublicProfile/PublicProfile';

const AuthorProfilePage = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  let currentUser;
  return (
    <div>
      <h2>Author's articles</h2>

      {currentUser ? <MyProfile /> : <PublicProfile />}
    </div>
  );
};

export default AuthorProfilePage;
