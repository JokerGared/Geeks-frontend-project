import { useLocation, Link } from 'react-router-dom';
import s from './ArticlesEmpty.module.css';

const ArticlesEmpty = () => {
  const location = useLocation();
  const path = location.pathname;

  let description = '';
  let linkText = '';
  let linkTo = '';
  let showLink = false;

  if (path === '/articles') {
    description = 'Be the first, who create an article';
    linkText = 'Create an article';
    linkTo = '/create';
    showLink = true;
  } else if (path === '/profile/saved') {
    description = 'Save your first article';
    linkText = 'Go to articles';
    linkTo = '/articles';
    showLink = true;
  } else if (path === '/profile') {
    description = 'Nothing found.';
    linkText = 'Create an article';
    linkTo = '/create';
    showLink = true;
  } else if (path === '/profile/my-articles') {
    description = 'Save your first article';
    linkText = 'Go to articles';
    linkTo = '/articles';
    showLink = true;
  }
  return (
    <div className={s.emptyWrapper}>
      <div className={s.infoWapper}>
        <svg className={s.icon} width="64px" height="64">
          <use xlinkHref="/icons.svg#icon-notification" />
        </svg>
        <h2 className={s.title}>Nothing found.</h2>
        <p className={s.text}>{description}</p>
      </div>

      {showLink && (
        <Link to={linkTo} className={s.button}>
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default ArticlesEmpty;
