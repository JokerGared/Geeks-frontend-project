import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../redux/articles/operations';
import { selectCurrentArticle } from '../../redux/articles/selectors';

const ArticlePage = () => {
  const { articleId } = useParams();

  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);
  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  if (!article) return <p>Loading...</p>;
  return (
    <div>
      <h2>{article.title}</h2>
      <img src={article.img} alt={article.title} />
      <p>{article.desc}</p>
    </div>
  );
};

export default ArticlePage;
