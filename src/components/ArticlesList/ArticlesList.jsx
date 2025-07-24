import s from './ArticlesList.module.css';

import ArticleItem from '../ArticleItem/ArticleItem';

const ArticlesList = () => {
  const articlesList = [];
  return (
    <div>
      <ul>
        {articlesList.map(item => (
          <li key={item.id}>
            <ArticleItem {...item} />
          </li>
        ))}
      </ul>

      <button type='button'>Load more</button>
    </div>
  );
};

export default ArticlesList;
