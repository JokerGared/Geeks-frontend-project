import s from './ArticlesList.module.css';
import ArticleItem from '../ArticleItem/ArticleItem';

const ArticlesList = ({ articles = [], onLoadMore }) => {
  if (!Array.isArray(articles) || articles.length === 0) {
    return <p className={s.noArticles}>No articles found.</p>;
  }

  return (
    <div className={s.wrapper}>
      <ul className={s.articlesList}>
        {articles.map((item) => (
          <li key={item._id} className={s.article}>
            <ArticleItem {...item} />
          </li>
        ))}
      </ul>

      {onLoadMore && <LoadMoreBtn onClick={onLoadMore} />}
    </div>
  );
};

export default ArticlesList;
