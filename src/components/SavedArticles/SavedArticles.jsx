import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticlesList from '../ArticlesList/ArticlesList';
import { fetchFavorites } from '../../redux/favorites/operations';
import {
  selectFavorites,
  selectFavoritesHasNextPage,
  selectFavoritesLoading,
} from '../../redux/favorites/selectors';
import ArticlesEmpty from '../ArticlesEmpty/ArticlesEmpty';

const SavedArticles = () => {
  const dispatch = useDispatch();

  const articles = useSelector(selectFavorites);
  const isLoading = useSelector(selectFavoritesLoading);
  const hasNextPage = useSelector(selectFavoritesHasNextPage);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1 && articles.length === 0) {
      console.log('[SavedArticles] Initial fetch');
      dispatch(fetchFavorites({ page: 1 }));
    }
  }, [dispatch, page, articles.length]);

  const loadMore = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  return !isLoading && articles.length === 0 ? (
    <ArticlesEmpty />
  ) : (
    <ArticlesList
      articles={articles}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      onLoadMore={loadMore}
    />
  );
};

export default SavedArticles;
