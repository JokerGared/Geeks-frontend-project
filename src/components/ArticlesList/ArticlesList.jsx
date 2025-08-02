import s from './ArticlesList.module.css';
import ArticleItem from '../ArticleItem/ArticleItem';

const ArticlesList = ({
  articles = [],
  isLoading,
  hasNextPage,
  onLoadMore,
}) => {
  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {articles.map((article) => (
          <li key={article._id}>
            <ArticleItem {...article} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          type="button"
          className={s.loadMore}
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
};

export default ArticlesList;
