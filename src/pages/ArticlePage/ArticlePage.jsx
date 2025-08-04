import styles from './ArticlePage.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ArticlePageCard from '../../components/ArticlePageCard/ArticlePageCard';
import { fetchArticles } from '../../redux/articles/operations';
import {
  selectArticles,
  selectArticlesLoading,
  selectArticlesError,
} from '../../redux/articles/selectors';

const ArticlePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectArticlesLoading);
  const error = useSelector(selectArticlesError);

  useEffect(() => {
    if (!articles.length) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articles]);

  const article = articles.find((item) => item._id === id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found</p>;

  const { title, img, article: content, ownerId, date } = article;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <img src={img} alt={title} className={styles.image} loading="lazy" />

      <div className={styles.contentWrapper}>
        <div
          className={styles.textWrapper}
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
        />
        <div className={styles.cardWrapper}>
          <ArticlePageCard
            author={ownerId}
            date={date}
            recommendations={articles.filter((a) => a._id !== id).slice(0, 3)}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
