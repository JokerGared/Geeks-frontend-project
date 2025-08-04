import { useSelector } from 'react-redux';
import styles from './ArticlePageCard.module.css';
import { Link } from 'react-router-dom';
import { selectRecommendations } from '../../redux/articles/selectors';
import { selectUser } from '../../redux/auth/selectors';

const ArticlePageCard = ({ author, date, articleId }) => {
  const recommendations = useSelector((state) =>
    selectRecommendations(state, articleId),
  );
  const user = useSelector(selectUser);

  const current = recommendations.find(({ id }) => id === articleId);
  const isOwn = current?.ownerId === user?._id;

  return (
    <>
      <div className={styles['article-card']}>
        <p className={styles['article-card-author']}>
          Author: <a href="#">{author}</a>
        </p>
        <p className={styles['article-card-date']}>
          Published on: <span>{date}</span>
        </p>
        <p className={styles['article-card-label']}>
          You may also be interested
        </p>

        <div className={styles['recommendation-list']}>
          {recommendations.length === 0 && <p>No recommendations yet</p>}
          {recommendations.map(({ id, title, author }) => (
            <div key={id} className={styles['recommendation-item']}>
              <div className={styles['item-top']}>
                <h3 className={styles['item-title']}>{title}</h3>
                <Link to={`/articles/${id}`} className={styles['item-link']}>
                  <svg className={styles['item-icon']}>
                    <use href="/icons.svg#icon-arrow" />
                  </svg>
                </Link>
              </div>
              <p className={styles['item-author']}>{author}</p>
            </div>
          ))}
        </div>
      </div>

      <Link
        to={isOwn ? `/create/${articleId}` : `/articles/${articleId}`}
        className={styles['save-button']}
      >
        Save
        <svg className={styles['save-icon']}>
          <use href="/icons.svg#icon-save" />
        </svg>
      </Link>
    </>
  );
};

export default ArticlePageCard;
