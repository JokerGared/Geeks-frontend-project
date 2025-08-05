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

  if (!article) return null;

  const formattedText = article.article.replace(/\/n/g, '\n');

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>{article.title}</h2>
      <img className={styles.image} src={article.img} alt={article.title} />

      <div className={styles.contentWrapper}>
        <div className={styles.textWrapper}>
          <p className={styles.text}>{formattedText}</p>
        </div>
        <div className={styles.cardWrapper}>
          <ArticlePageCard article={article} />
          <div className={styles['save-button']}>
            <span className={styles['save-button-text']}>Save</span>
            <svg className={styles['save-icon']} width={24} height={24}>
              <use href="/icons.svg#icon-save" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlePage;
