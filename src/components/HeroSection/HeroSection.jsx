import { useSelector } from 'react-redux';
import s from './HeroSection.module.css';
import { Link } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import clsx from 'clsx';

const HeroSection = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section className={clsx(s.heroSection, 'section')}>
      <div className={clsx(s.heroTitleLinksContainer)}>
        <h1 className={clsx(s.heroTitle)}>
          Find your <span>harmony</span> in community
        </h1>

        <ul className={s.heroLinksList}>
          <li>
            <a href="#popular-articles" className={clsx(s.heroArticleLink)}>
              Go to Articles
            </a>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/register" className={clsx(s.heroRegisterLink)}>
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default HeroSection;
