import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import s from './AuthorProfilePage.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { fetchAuthorById } from '../../redux/authors/operations';
import { selectAuthorsError } from '../../redux/authors/selectors';
import PublicProfile from '../../components/PublicProfile/PublicProfile';

const AuthorProfilePage = () => {
  const { authorId } = useParams();
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthorsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authorId !== user._id) {
      dispatch(fetchAuthorById(authorId));
    }
  }, [dispatch, authorId, user._id]);

  if (authorId === user._id) return <Navigate to="/profile" />;

  if (error) {
    return (
      <div className={s.errorWrapper}>
        <p className={s.error}>This author was not found</p>
      </div>
    );
  }

  return <PublicProfile />;
};

export default AuthorProfilePage;
