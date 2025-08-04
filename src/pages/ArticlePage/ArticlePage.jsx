import styles from './ArticlePage.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ArticlePageCard from '../../components/ArticlePageCard/ArticlePageCard';
import {
  fetchArticleById,
  fetchArticles,
} from '../../redux/articles/operations';
import {
  selectArticleById,
  selectArticles,
  selectArticlesLoading,
  selectArticlesError,
} from '../../redux/articles/selectors';

const ArticlePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const article = useSelector((state) => selectArticleById(state, id));
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectArticlesLoading);
  const error = useSelector(selectArticlesError);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }

    if (!articles.length) {
      dispatch(fetchArticles());
    }
  }, [dispatch, id, articles]);

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
