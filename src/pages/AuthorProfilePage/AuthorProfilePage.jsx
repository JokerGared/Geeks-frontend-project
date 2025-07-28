import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { selectUser } from '../../redux/auth/selectors';
import { fetchAuthorById } from '../../redux/authors/operations';

import PublicProfilePage from '../PublicProfilePage/PublicProfilePage';

const AuthorProfilePage = () => {
  const { authorId } = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && authorId !== user?._id) {
      dispatch(fetchAuthorById(authorId));
    }
  }, [dispatch, authorId, user]);

  if (user && authorId === user?._id) {
    return <Navigate to="/profile" />;
  }

  return <PublicProfilePage />;
};

export default AuthorProfilePage;
