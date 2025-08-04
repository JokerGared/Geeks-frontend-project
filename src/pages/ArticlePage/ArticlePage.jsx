import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../redux/articles/operations';
import { selectCurrentArticle } from '../../redux/articles/selectors';
import ArticlePageCard from '../../components/ArticlePageCard/ArticlePageCard';
import styles from './ArticlePage.module.css';

const ArticlePage = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);

  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  if (!article) return <p className={styles.text}>Loading...</p>;

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>{article.title}</h2>
      <img className={styles.image} src={article.img} alt={article.title} />

      <div className={styles.contentWrapper}>
        <div className={styles.textWrapper}>
          <p className={styles.text}>{article.article}</p>
        </div>

        <div className={styles.cardWrapper}>
          <ArticlePageCard />
        </div>
      </div>
    </section>
  );
};

export default ArticlePage;
