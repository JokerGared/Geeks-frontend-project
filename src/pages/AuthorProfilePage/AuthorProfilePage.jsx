import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MyProfile from '../MyProfile/MyProfile';
import PublicProfile from '../../components/PublicProfile/PublicProfile';

import { selectUser } from '../../redux/auth/selectors';
import { fetchAuthorById } from '../../redux/authors/operations';
import { selectCurrentAuthor } from '../../redux/authors/selectors';

const AuthorProfilePage = () => {
  const { authorId } = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthorById(authorId));
  }, [dispatch, authorId]);

  return (
    <>{user && authorId === user._id ? <MyProfile /> : <PublicProfile />}</>
  );
};

export default AuthorProfilePage;
