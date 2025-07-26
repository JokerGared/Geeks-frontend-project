import { Navigate } from 'react-router-dom';

export function PrivateRoute({ component, redirectTo }) {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
