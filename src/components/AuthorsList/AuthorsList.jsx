import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import s from './AuthorsList.module.css';
import Loader from '../Loader/Loader';

import {
  selectAuthors,
  selectAuthorsLoading,
  selectAuthorsError,
  selectHasNextPage,
} from '../../redux/authors/selectors';

import { fetchAuthors } from '../../redux/authors/operations';

const AuthorsList = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthors);
  const isLoading = useSelector(selectAuthorsLoading);
  const error = useSelector(selectAuthorsError);
  const hasNextPage = useSelector(selectHasNextPage);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAuthors(1));
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(fetchAuthors(nextPage));
    setPage(nextPage);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {error && (
        <p className={s.status}>Sorry, this author could not be found.</p>
      )}
      {!isLoading && !error && (
        <ul className={s.list}>
          {authors.map((author) => (
            <li key={author._id} className={s.item}>
              <AuthorsItem {...author} />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !error && hasNextPage && (
        <button type="button" onClick={handleLoadMore} className={s.loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default AuthorsList;
