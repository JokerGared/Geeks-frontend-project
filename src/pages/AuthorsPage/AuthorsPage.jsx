import s from './AuthorsPage.module.css';
import AuthorsList from '../../components/AuthorsList/AuthorsList';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';

import {
  selectAuthors,
  selectAuthorsLoading,
  selectAuthorsError,
  selectAuthorsHasNextPage,
} from '../../redux/authors/selectors';

import { fetchAuthors } from '../../redux/authors/operations';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthors);
  const isLoading = useSelector(selectAuthorsLoading);
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
      {isLoading && <Loader />}
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
