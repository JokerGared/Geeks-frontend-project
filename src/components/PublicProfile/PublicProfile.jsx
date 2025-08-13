import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';
import ArticlesList from '../ArticlesList/ArticlesList';

import { fetchAuthorById } from '../../redux/authors/operations';
import { fetchArticlesByAuthorId } from '../../redux/articles/operations';

import { selectCurrentAuthor } from '../../redux/authors/selectors';
import {
  selectAuthorArticles,
  selectArticlesHasNextPage,
  selectArticlesPage,
} from '../../redux/articles/selectors';

import s from './PublicProfile.module.css';
import ArticlesEmpty from '../ArticlesEmpty/ArticlesEmpty';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import { selectIsLoading } from '../../redux/loading/selectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { clearAuthorArticles } from '../../redux/articles/slice';
import { clearAuthors } from '../../redux/authors/slice';

const PublicProfile = () => {
  const { authorId } = useParams();
  const dispatch = useDispatch();

  const author = useSelector(selectCurrentAuthor);
  const articles = useSelector(selectAuthorArticles);
  const isLoading = useSelector(selectIsLoading);
  const hasNextPage = useSelector(selectArticlesHasNextPage);
  const page = useSelector(selectArticlesPage);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [noArticles, setNoArticles] = useState(false);

  useEffect(() => {
    dispatch(clearAuthors());
    dispatch(fetchAuthorById(authorId));
  }, [dispatch, authorId]);

  useEffect(() => {
    dispatch(clearAuthorArticles());
    if (authorId) {
      dispatch(fetchArticlesByAuthorId({ id: authorId, page: 1 }))
        .unwrap()
        .then((resp) => {
          if (resp.data.length === 0) {
            setNoArticles(true);
          }
        });
    }
  }, [dispatch, authorId]);

  const handleLoadMore = () => {
    if (author._id && hasNextPage) {
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

        <div className={s.userInfoWithSubscribe}>
          <div className={s.userInfo}>
            <h2 className={s.authorName}>{name}</h2>
            <p className={s.articleCounter}>{articlesAmount} articles</p>
          </div>

          {isLoggedIn && <SubscribeButton />}
        </div>
      </div>
      {articles.length === 0 && noArticles ? (
        <ArticlesEmpty />
      ) : (
        <ArticlesList
          articles={articles}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default PublicProfile;
