import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchArticleById } from '../../redux/articles/operations';
import { selectCurrentArticle } from '../../redux/articles/selectors';
import { selectUser } from '../../redux/auth/selectors';

import ArticlePageCard from '../../components/ArticlePageCard/ArticlePageCard';
import ButtonSave from '../../components/ButtonSave/ButtonSave';

import styles from './ArticlePage.module.css';
import ButtonEdit from '../../components/ButtonEdit/ButtonEdit';

const ArticlePage = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();

  const article = useSelector(selectCurrentArticle);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  if (!article || !user) return null;

  const formattedText = article.article.replace(/\/n/g, '\n');

  const isOwnArticle =
    user &&
    article.ownerId &&
    user._id ===
      (typeof article.ownerId === 'string'
        ? article.ownerId
        : article.ownerId._id);

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

          {isOwnArticle ? (
            <ButtonEdit to={`/create/${articleId}`} className="LargeButton">
              Edit article
            </ButtonEdit>
          ) : (
            <ButtonSave article={article} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticlePage;
