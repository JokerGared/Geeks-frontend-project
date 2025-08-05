import { Link } from 'react-router-dom';
import ArticleItem from '../ArticleItem/ArticleItem';
import clsx from 'clsx';
import s from './PopularArticlesSection.module.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectPopularArticles } from '../../redux/articles/selectors';
import { fetchArticles } from '../../redux/articles/operations';
import { useEffect, useState } from 'react';

const PopularArticlesSection = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const articles = useSelector(selectPopularArticles);

  useEffect(() => {
    if (page === 1 && articles.length === 0) {
      dispatch(fetchArticles(1));
    }
  }, [dispatch, page, articles.length]);
  console.log('articles from selector:', articles);
  return (
    <section className={clsx('section')} id="popular-articles">
      <div className={clsx(s.popularArticlesTitleLinkContainer)}>
        <SectionTitle className={clsx(s.popularArticlesTitle)}>
          Popular Articles
        </SectionTitle>
        <Link to="/articles" className={clsx(s.popularArticlesLink)}>
          Go to all Articles
          <svg width={24} height={24} className={clsx(s.topCreatorsIcon)}>
            <use href="/icons.svg#icon-arrow"></use>
          </svg>
        </Link>
      </div>
      {!articles.length && <p>...Loading</p>}
      <ul className={clsx(s.popularArticlesList)}>
        {articles.map((article) => (
          <li key={article._id}>
            <ArticleItem articleItem={article} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularArticlesSection;
