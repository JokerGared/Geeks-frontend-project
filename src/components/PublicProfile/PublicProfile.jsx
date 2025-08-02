import s from './PublicProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { selectCurrentAuthor } from '../../redux/authors/selectors';
import { fetchAuthorById } from '../../redux/authors/operations';

import {
  selectAuthorArticles,
  selectIsLoading,
  selectHasNextPage,
  selectPage,
} from '../../redux/articles/selectors';
import { fetchArticlesByAuthorId } from '../../redux/articles/operations';

import ArticlesList from '../ArticlesList/ArticlesList';

const PublicProfile = () => {
  const { authorId } = useParams();
  const dispatch = useDispatch();

  const author = useSelector(selectCurrentAuthor);
  const articles = useSelector(selectAuthorArticles);
  const isLoading = useSelector(selectIsLoading);
  const hasNextPage = useSelector(selectHasNextPage);
  const page = useSelector(selectPage);

  // Завантаження автора
  useEffect(() => {
    dispatch(fetchAuthorById(authorId));
  }, [dispatch, authorId]);

  // Завантаження статей автора
  useEffect(() => {
    if (author?._id) {
      dispatch(fetchArticlesByAuthorId({ id: author._id, page: 1 }));
    }
  }, [dispatch, author?._id]);

  const handleLoadMore = () => {
    if (author?._id && hasNextPage) {
      dispatch(fetchArticlesByAuthorId({ id: author._id, page: page + 1 }));
    }
  };

  if (!author) return <p>Loading author...</p>;

  const { name, avatarUrl, articlesAmount } = author;

  return (
    <div className={s.pageWrapper}>
      <div className={s.userInfoWrapper}>
        <div className={s.avatarWrapper}>
          {avatarUrl ? (
            <img className={s.avatar} src={avatarUrl} alt={name} />
          ) : (
            <div className={s.fallbackAvatar}>
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className={s.userInfo}>
          <h2 className={s.authorName}>{name}</h2>
          <p className={s.articleCounter}>{articlesAmount} articles</p>
        </div>
      </div>

      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default PublicProfile;
