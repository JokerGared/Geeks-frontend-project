import s from './ArticlesList.module.css';
import ArticleItem from '../ArticleItem/ArticleItem';
import { useEffect, useRef } from 'react';

const ArticlesList = ({
  articles = [],
  isLoading,
  hasNextPage,
  onLoadMore,
  selectedFilter,
  loadMoreTriggeredRef,
}) => {
  const prevArticlesLength = useRef(0);
  const firstNewArticleRef = useRef(null);

  useEffect(() => {
    const isLoadMoreClicked = loadMoreTriggeredRef?.current;

    const prevLength = prevArticlesLength.current;
    const newLength = articles.length;

    if (
      isLoadMoreClicked &&
      newLength > prevLength &&
      firstNewArticleRef.current &&
      !isLoading
    ) {
      firstNewArticleRef.current.scrollIntoView({ behavior: 'smooth' });
      loadMoreTriggeredRef.current = false;
    }

    prevArticlesLength.current = newLength;
  }, [articles.length]);

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {articles.map((articleItem, index) => (
          <li
            key={articleItem?._id}
            ref={
              loadMoreTriggeredRef?.current &&
              index === prevArticlesLength.current
                ? firstNewArticleRef
                : null
            }
          >
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
