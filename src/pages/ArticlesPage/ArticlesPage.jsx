import { useDispatch, useSelector } from 'react-redux';

import s from './ArticlesPage.module.css';
import { fetchArticles } from '../../redux/articles/operations';
import { useEffect } from 'react';
import ArticlesList from '../../components/ArticlesList/ArticlesList';

const ArticlesPage = () => {
  
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectArticlesLoading);
  const error = useSelector(selectArticlesError);
  const hasNextPage()

  const dispatch = useDispatch();
useEffect(()=>{dispatch(fetchArticles(1))},[dispatch])

}
  return (
    <div className={s.articlesPageWrapper}>
      <h2 className={styles.pageTitle}>Articles</h2>

      <div className={styles.counterContainer}>
        <span className={styles.articleCounter}>
          {articles.length} articles
        </span>

        <select
          className={styles.filterSelect}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="popular">Popular</option>
          <option value="all">All</option>
        </select>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && (
        <>
          <ArticlesList articles={articles} />
          {hasNextPage && (
            <button onClick={loadMore} className={s.loadMoreBtn}>
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ArticlesPage;
