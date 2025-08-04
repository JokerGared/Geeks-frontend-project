import styles from './ArticlePageCard.module.css';
import { Link } from 'react-router-dom';
const ArticlePageCard = ({ author, date, recommendations }) => {
  return (
    <>
      {' '}
      <div className={styles['article-card']}>
        {' '}
        <p className={styles['article-card-author']}>
          {' '}
          Author: <a href="#">{author}</a>{' '}
        </p>{' '}
        <p className={styles['article-card-date']}>
          {' '}
          Published on: <span>{date}</span>{' '}
        </p>{' '}
        <p className={styles['article-card-label']}>
          {' '}
          You may also be interested{' '}
        </p>{' '}
        <div className={styles['recommendation-list']}>
          {' '}
          {recommendations.map(({ id, title, author }) => (
            <div key={id} className={styles['recommendation-item']}>
              {' '}
              <div className={styles['item-top']}>
                {' '}
                <h3 className={styles['item-title']}>{title}</h3>{' '}
                <Link to={`/articles/${id}`} className={styles['item-link']}>
                  {' '}
                  <svg className={styles['item-icon']}>
                    {' '}
                    <use href="/icons.svg#icon-arrow" />{' '}
                  </svg>{' '}
                </Link>{' '}
              </div>{' '}
              <p className={styles['item-author']}>{author}</p>{' '}
            </div>
          ))}{' '}
        </div>{' '}
      </div>{' '}
      <button className={styles['save-button']}>
        {' '}
        Save{' '}
        <svg className={styles['save-icon']}>
          {' '}
          <use href="/icons.svg#icon-save" />{' '}
        </svg>{' '}
      </button>{' '}
    </>
  );
};
export default ArticlePageCard;
