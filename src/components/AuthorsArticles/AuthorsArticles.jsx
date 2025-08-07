import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticlesList from '../ArticlesList/ArticlesList';
import { fetchArticlesByAuthorId } from '../../redux/articles/operations';
import {
  selectAuthorArticles,
  selectArticlesHasNextPage,
  selectArticlesPage,
} from '../../redux/articles/selectors';
import { selectCurrentAuthor } from '../../redux/authors/selectors';
import { selectUser } from '../../redux/auth/selectors';
import ArticlesEmpty from '../ArticlesEmpty/ArticlesEmpty';
import { selectIsLoading } from '../../redux/loading/selectors';

const AuthorsArticles = () => {
  const dispatch = useDispatch();
  const author = useSelector(selectCurrentAuthor);
  const user = useSelector(selectUser);
  const isOwnPage = author?._id === user?._id;

  const articles = useSelector(selectAuthorArticles);
  const isLoading = useSelector(selectIsLoading);
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

  if (!isLoading && articles.length === 0) {
    return <ArticlesEmpty />;
  }
  return (
    !isLoading && (
      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onLoadMore={loadMore}
      />
    )
  );
};

export default AuthorsArticles;
