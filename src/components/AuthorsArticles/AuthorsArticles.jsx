import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticlesList from '../ArticlesList/ArticlesList';
import { fetchArticlesByAuthorId } from '../../redux/articles/operations';
import {
  selectAuthorArticles,
  selectArticlesLoading,
  selectArticlesHasNextPage,
  selectArticlesPage,
} from '../../redux/articles/selectors';
import { selectCurrentAuthor } from '../../redux/authors/selectors';
import { selectUser } from '../../redux/auth/selectors';

const AuthorsArticles = () => {
  const dispatch = useDispatch();
  const author = useSelector(selectCurrentAuthor);
  const user = useSelector(selectUser);
  const isOwnPage = author?._id === user?._id;

  const articles = useSelector(selectAuthorArticles);
  const isLoading = useSelector(selectArticlesLoading);
  const hasNextPage = useSelector(selectArticlesHasNextPage);
  const page = useSelector(selectArticlesPage);

  useEffect(() => {
    if (isOwnPage && author?._id) {
      dispatch(fetchArticlesByAuthorId({ id: author._id, page: 1 }));
    }
  }, [dispatch, isOwnPage, author?._id]);

  const loadMore = () => {
    if (isOwnPage && author?._id && hasNextPage) {
      dispatch(fetchArticlesByAuthorId({ id: author._id, page: page + 1 }));
    }
  };
  return (
    <ArticlesList
      articles={articles}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      onLoadMore={loadMore}
    />
  );
};

export default AuthorsArticles;
