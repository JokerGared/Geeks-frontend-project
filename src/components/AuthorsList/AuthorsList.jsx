import s from './AuthorsList.module.css';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAuthors,
  selectAuthorsLoading,
  selectAuthorsError,
} from '../../redux/authors/selectors';
import { fetchAuthors } from '../../redux/authors/operations';

const AuthorsList = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthors);
  const isLoading = useSelector(selectAuthorsLoading);
  const error = useSelector(selectAuthorsError);

  const handleLoadMore = () => {
    dispatch(fetchAuthors());
  };

  return (
    <div>
      {isLoading && <p className={s.status}>Loading...</p>}
      {error && <p className={s.status}>Error: {error}</p>}
      <ul className={s.list}>
        {authors.map((author) => (
          <li key={author.id} className={s.item}>
            <AuthorsItem {...author} />
          </li>
        ))}
      </ul>
      {!isLoading && (
        <button type="button" onClick={handleLoadMore} className={s.loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default AuthorsList;
