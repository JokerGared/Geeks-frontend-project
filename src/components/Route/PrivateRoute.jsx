// код з дз для прикладу

// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';

export function PrivateRoute({ component, redirectTo }) {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
