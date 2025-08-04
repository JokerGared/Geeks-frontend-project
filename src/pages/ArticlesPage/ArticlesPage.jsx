import s from './ArticlesPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
  selectArticles,
  selectArticlesLoading,
  selectArticlesError,
  selectArticlesHasNextPage,
} from '../../redux/articles/selectors';
import { fetchArticles } from '../../redux/articles/operations';

import ArticlesList from '../../components/ArticlesList/ArticlesList';
import Loader from '../../components/Loader/Loader';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { fetchFavorites } from '../../redux/favorites/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectFavorites } from '../../redux/favorites/selectors';

const ArticlesPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectArticlesLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectArticlesError);
  const hasNextPage = useSelector(selectArticlesHasNextPage);

  const [selectedFilter, setSelectedFilter] = useState('popular'); // заглушка

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (isLoggedIn && favorites.length === 0) {
      dispatch(fetchFavorites({ page: 1 }));
    }
  }, [dispatch, isLoggedIn, favorites.length]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const onLoadMore = () => {
    if (hasNextPage && !isLoading) {
      setPage((prev) => prev + 1); // ✅
    }
  };

  return (
    <div className={s.wrapper}>
      <SectionTitle className={s.title}>Articles</SectionTitle>

      <div className={s.counterContainer}>
        <p className={s.articleCounter}>{articles.length} articles</p>

        <select
          className={s.filterSelect}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="popular">Popular</option>
          <option value="all">All</option>
        </select>
      </div>

      {error && <p className={s.error}>{error}</p>}

      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onLoadMore={onLoadMore}
      />

      {isLoading && <Loader />}
    </div>
  );
};

export default ArticlesPage;
