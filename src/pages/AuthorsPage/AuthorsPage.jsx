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

import { fetchAuthors, loadMoreAuthors } from '../../redux/authors/operations';
import { selectIsLoading } from '../../redux/loading/selectors';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthors);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthorsError);
  const hasNextPage = useSelector(selectAuthorsHasNextPage);

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(fetchAuthors(1));
    }
  }, [dispatch, authors.length]);

  const handleLoadMore = () => {
    dispatch(loadMoreAuthors());
  };
  
  return (
    <section className={s.authorsPage}>
      <SectionTitle className={s.title}>Authors</SectionTitle>
      {error && authors.length === 0 ? (
        <p className={s.status}>Sorry, this authors could not be found.</p>
      ) : (
        <AuthorsList authors={authors} />
      )}
      {!error && <AuthorsList authors={authors} />}
      {!isLoading && !error && hasNextPage && (
        <button type="button" onClick={handleLoadMore} className={s.loadMore}>
          Load more
        </button>
      )}
    </section>
  );
};

export default AuthorsPage;
