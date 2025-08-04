import { useDispatch, useSelector } from 'react-redux';
import { selectArticles } from '../../redux/articles/selectors';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import s from './ArticlePageCard.module.css';
import { useEffect } from 'react';
import { fetchArticles } from '../../redux/articles/operations';

const ArticlePageCard = ({ article }) => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const navigate = useNavigate();
  useEffect(() => {
    if (articles.length === 0) dispatch(fetchArticles(1));
  }, [dispatch]);

  const recommendedArticles = articles
    .filter((art) => art._id !== article._id)
    .slice(0, 3);

  const { ownerId, date } = article;

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
        Published on: <span>{format(new Date(date), 'dd.MM.yyyy')}</span>
      </p>

      <div className={s['article-card-label']}>You may also be interested</div>

      <div className={s['recommendation-list']}>
        {recommendedArticles.map(({ _id, title, ownerId }) => (
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
    </div>
  );
};

export default ArticlePageCard;
