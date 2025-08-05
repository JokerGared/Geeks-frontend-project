import s from './ArticlesList.module.css';
import ArticleItem from '../ArticleItem/ArticleItem';

const ArticlesList = ({
  articles = [],
  isLoading,
  hasNextPage,
  onLoadMore,
  selectedFilter,
}) => {
  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {articles.map((articleItem) => (
          <li key={articleItem?._id}>
            <ArticleItem articleItem={articleItem} />
          </li>
        ))}
      </ul>

      {hasNextPage && selectedFilter === 'all' && (
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
