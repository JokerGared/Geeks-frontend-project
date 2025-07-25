import PropTypes from 'prop-types';
import s from './ArticlesList.module.css';
import ArticleItem from '../ArticleItem/ArticleItem';

const ArticlesList = ({ articles = [], onLoadMore }) => {
  if (!Array.isArray(articles) || articles.length === 0) {
    return <p className={s.noArticles}>No articles found.</p>;
  }

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {articles.map((item) => (
          <li key={item.id} className={s.item}>
            <ArticleItem {...item} />
          </li>
        ))}
      </ul>

      {onLoadMore && (
        <button type="button" className={s.loadMore} onClick={onLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  onLoadMore: PropTypes.func,
};

export default ArticlesList;
