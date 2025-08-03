import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticlesList from '../ArticlesList/ArticlesList';
import { fetchFavorites } from '../../redux/favorites/operations';
import {
  selectFavorites,
  selectFavoritesHasNextPage,
  selectFavoritesLoading,
  selectFavoritesPage,
} from '../../redux/favorites/selectors';

const SavedArticles = () => {
  const dispatch = useDispatch();

  // const token = useSelector((state) => state.auth.token);
  // console.log('[SavedArticles] token:', token);

  const articles = useSelector(selectFavorites);
  const isLoading = useSelector(selectFavoritesLoading);
  const hasNextPage = useSelector(selectFavoritesHasNextPage);
  const page = useSelector(selectFavoritesPage);

  useEffect(() => {
    console.log('[SavedArticles] DISPATCH fetchFavorites');
    dispatch(fetchFavorites({ page: 1 }));
  }, [dispatch]);

  const loadMore = () => {
    if (hasNextPage) {
      dispatch(fetchFavorites({ page: page + 1 }));
    }
  };

  return !isLoading && articles.length === 0 ? (
    <p>No Saved Articles</p>
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
