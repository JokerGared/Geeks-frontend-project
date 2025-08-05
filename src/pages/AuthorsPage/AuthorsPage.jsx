import s from './AuthorsPage.module.css';
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectAuthors,
  selectAuthorsError,
  selectAuthorsHasNextPage,
} from '../../redux/authors/selectors';

import { fetchAuthors } from '../../redux/authors/operations';
import { selectIsLoading } from '../../redux/loading/selectors';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthors);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthorsError);
  const hasNextPage = useSelector(selectAuthorsHasNextPage);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(fetchAuthors(page));
    }
  }, [dispatch, page]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchAuthors(nextPage));
  };
  return (
    <section className={s.authorsPage}>
      <SectionTitle className={s.title}>Authors</SectionTitle>
      {error && authors.length === 0 ? (
        <p className={s.status}>Sorry, this authors could not be found.</p>
      ) : (
        <AuthorsList authors={authors} />
      )}
      {!isLoading && !error && hasNextPage && (
        <button type="button" onClick={handleLoadMore} className={s.loadMore}>
          Load more
        </button>
      )}
    </section>
  );
};

export default AuthorsPage;
