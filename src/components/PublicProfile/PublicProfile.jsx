import s from './PublicProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentAuthor } from '../../redux/authors/selectors';
import { selectAuthorArticles } from '../../redux/articles/selectors';
import ArticlesList from '../ArticlesList/ArticlesList';
import { fetchAuthorById } from '../../redux/authors/operations';
import { fetchArticlesByAuthorId } from '../../redux/articles/operations';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const PublicProfile = () => {
  // console.log(useParams());

  const { authorId } = useParams();

  const dispatch = useDispatch();

  const author = useSelector(selectCurrentAuthor);
  const articles = useSelector(selectAuthorArticles);

  useEffect(() => {
    dispatch(fetchAuthorById(authorId));
  }, [dispatch, authorId]);

  useEffect(() => {
    if (author?._id) {
      dispatch(fetchArticlesByAuthorId({ id: author._id }));
    }
  }, [dispatch, author?._id]);
  console.log('Articles from redux:', articles);

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
      <ArticlesList articles={articles} />
    </div>
  );
};

export default PublicProfile;
