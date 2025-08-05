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

import { fetchAuthors, loadMoreAuthors } from '../../redux/authors/operations';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthors);
  const isLoading = useSelector(selectAuthorsLoading);
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
      {isLoading && <Loader />}
      {error && (
        <p className={s.status}>Sorry, this author could not be found.</p>
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
