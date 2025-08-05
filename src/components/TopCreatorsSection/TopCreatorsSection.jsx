import { Link } from 'react-router-dom';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import SectionTitle from '../SectionTitle/SectionTitle';
import clsx from 'clsx';
import s from './TopCreatorsSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAuthors } from '../../redux/authors/operations';
import { selectTopCreators } from '../../redux/authors/selectors';

const TopCreatorsSection = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const authorsList = useSelector(selectTopCreators);

  useEffect(() => {
    if (page === 1 && authorsList.length === 0) {
      dispatch(fetchAuthors(1));
    }
  }, [dispatch, page, authorsList.length]);

  return (
    <section className={clsx('section')} id="top-creators">
      <div className={clsx(s.topCreatorsTitleLinkContainer)}>
        <SectionTitle className={clsx(s.topCreatorsTitle)}>
          Top Creators
        </SectionTitle>
        <Link to="/authors" className={clsx(s.topCreatorsLink)}>
          Go to all Creators
          <svg width={24} height={24} className={clsx(s.topCreatorsIcon)}>
            <use href="/icons.svg#icon-arrow"></use>
          </svg>
        </Link>
      </div>

      <ul className={s.topCreatorsList}>
        {authorsList.map((author) => (
          <li key={author._id} className={s.item}>
            <AuthorsItem
              {...author}
              avatarClassName={clsx(s.topCreatorAvatar)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopCreatorsSection;
