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

const ArticlesPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectArticlesLoading);
  const error = useSelector(selectArticlesError);
  const hasNextPage = useSelector(selectArticlesHasNextPage);

  const [selectedFilter, setSelectedFilter] = useState('popular'); // заглушка

  useEffect(() => {
    if (page === 1 && articles.length === 0) {
      dispatch(fetchArticles(1));
    }
  }, [dispatch, page, articles.length]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const onLoadMore = () => {
    if (hasNextPage && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      dispatch(fetchArticles(nextPage));
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
