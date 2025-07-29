import s from './ArticlesList.module.css';
import ArticleItem from '../ArticleItem/ArticleItem';

const ArticlesList = ({ articles = [], onLoadMore }) => {
  if (articles.length === 0) {
    return <p className={s.noArticles}>No articles yet</p>;
  }

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {articles.map((item) => (
          <li key={item._id}>
            <ArticleItem {...item} />
          </li>
        ))}
      </ul>

      <button type="button" className={s.loadMore} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default ArticlesList;
