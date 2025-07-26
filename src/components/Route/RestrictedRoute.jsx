import { Navigate } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";

const RestrictedRoute = ({ component, redirectTo = '/' }) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return component;
};
export default RestrictedRoute;
