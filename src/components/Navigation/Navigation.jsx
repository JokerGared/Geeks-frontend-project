import s from './Navigation.module.css';

import { NavLink, Link, useParams } from 'react-router-dom';

const Navigation = () => {
  const isLoggedIn = true;
  // const currentUserId = useSelector(selectUserId);

  return (
    <nav>
      <Link to='/'>
        <img src='/logo.svg' alt='Logo' />
      </Link>

      <NavLink to='/'>Home</NavLink>
      <NavLink to='/articles'>Articles</NavLink>
      <NavLink to='/authors'>Creators</NavLink>

      {!isLoggedIn && (
        <>
          <NavLink to='/login'>Log in</NavLink>
          <NavLink to='/register'>Join now</NavLink>
        </>
      )}

      {/* {isLoggedIn && <NavLink to={`/authors/${currentUserId}`}>My Profile</NavLink>} */}
    </nav>
  );
};

export default Navigation;
