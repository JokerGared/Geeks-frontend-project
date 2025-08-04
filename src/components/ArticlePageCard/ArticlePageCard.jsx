import { useSelector } from 'react-redux';
import { selectArticles } from '../../redux/articles/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import s from './ArticlePageCard.module.css';

const ArticlePageCard = () => {
  const articles = useSelector(selectArticles);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const mainArticle = articles[0];
  const recommended = articles.slice(0, 3);

  if (!mainArticle) {
    return <div className={s['article-card']}>Loading...</div>;
  }

  const { ownerId, date, _id, title, article } = mainArticle;

  const isOwn = ownerId === user?._id;

  return (
    <div className={s['article-card']}>
      <p className={s['article-card-author']}>
        Author:{' '}
        <Link
          to={`/profile/${ownerId?._id}`}
          className={s['article-card-author-link']}
        >
          {ownerId?.name}
        </Link>
      </p>

      <p className={s['article-card-date']}>
        Published on: <span>{date}</span>
      </p>

      <div className={s['article-card-label']}>You may also be interested</div>

      <div className={s['recommendation-list']}>
        {recommended.map(({ _id, title, ownerId }) => (
          <div key={_id} className={s['recommendation-item']}>
            <div className={s['item-top']}>
              <h3 className={s['item-title']}>{title}</h3>
              <div
                className={s['item-link']}
                onClick={() => navigate(`/articles/${_id}`)}
              >
                <svg className={s['item-icon']}>
                  <use href="/icons.svg#icon-arrow" />
                </svg>
              </div>
            </div>
            <p className={s['item-author']}>{ownerId?.name}</p>
          </div>
        ))}
      </div>

      <div className={s['save-button']}>
        <span className={s['save-button-text']}>Save</span>
        <svg className={s['save-icon']}>
          <use href="/icons.svg#icon-save" />
        </svg>
      </div>
    </div>
  );
};

export default ArticlePageCard;
