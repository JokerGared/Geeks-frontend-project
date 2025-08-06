import s from './ArticlesPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
  selectArticles,
  selectArticlesError,
  selectArticlesHasNextPage,
  selectPopularArticles,
  selectTotalArticles,
} from '../../redux/articles/selectors';
import {
  fetchArticles,
  popularArticles,
} from '../../redux/articles/operations';

import ArticlesList from '../../components/ArticlesList/ArticlesList';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { selectIsLoading } from '../../redux/loading/selectors';
import {
  clearArticles,
  clearPopularArticles,
} from '../../redux/articles/slice';

const ArticlesPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectArticlesError);
  const hasNextPage = useSelector(selectArticlesHasNextPage);
  const popular = useSelector(selectPopularArticles);
  const totalArticles = useSelector(selectTotalArticles);

  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (selectedFilter === 'all') {
      dispatch(clearPopularArticles());
      dispatch(fetchArticles(page));
    } else if (selectedFilter === 'popular') {
      dispatch(clearArticles());
      dispatch(popularArticles());
    }
  }, [page, selectedFilter]);

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
        <p className={s.articleCounter}>
          {selectedFilter === 'all' ? totalArticles : popular.length} articles
        </p>

        <select
          className={s.filterSelect}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="popular">Popular</option>
          <option value="all">All</option>
        </select>
      </div>

      <ArticlesList
        articles={selectedFilter === 'all' ? articles : popular}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onLoadMore={onLoadMore}
        selectedFilter={selectedFilter}
      />
    </div>
  );
};

export default ArticlesPage;
