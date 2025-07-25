import { NavLink, Outlet } from 'react-router-dom';
import s from './MyProfile.module.css';

const MyProfile = () => {
  return (
    <div>
      <h2>Author's articles</h2>
      <nav>
        <NavLink to="my-articles">My Articles</NavLink>
        <NavLink to="saved">Saved Articles</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MyProfile;
