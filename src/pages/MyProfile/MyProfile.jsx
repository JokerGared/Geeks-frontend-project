import { NavLink, Outlet } from 'react-router-dom';
import s from './MyProfile.module.css';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectUser } from '../../redux/auth/selectors';
import { fetchAuthorById } from '../../redux/authors/operations';
import { fetchArticlesByAuthorId } from '../../redux/articles/operations';
import { selectAuthorArticles } from '../../redux/articles/selectors';
import { selectCurrentAuthor } from '../../redux/authors/selectors';

import clsx from 'clsx';

const MyProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const author = useSelector(selectCurrentAuthor);
  const articles = useSelector(selectAuthorArticles);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchAuthorById(user._id));
      dispatch(fetchArticlesByAuthorId({ id: user._id }));
    }
  }, [dispatch, user?._id]);

  if (!user?._id) return <p>Loading user...</p>;
  if (!author) return <p>Loading author...</p>;

  const { name, avatarUrl, articlesAmount } = author;

  return (
    <div className={s.pageWrapper}>
      <SectionTitle className={s.title}>My Profile</SectionTitle>

      <div className={s.userInfoWrapper}>
        <div className={s.avatarWrapper}>
          {avatarUrl ? (
            <img className={s.avatar} src={avatarUrl} alt={name} />
          ) : (
            <div className={s.fallbackAvatar}>
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className={s.userInfo}>
          <h2 className={s.authorName}>{name}</h2>
          <p className={s.articleCounter}>{articlesAmount} articles</p>
        </div>
      </div>

      <nav className={s.nav}>
        <NavLink
          to="my-articles"
          className={({ isActive }) => clsx(s.link, isActive && s.active)}
        >
          My Articles
        </NavLink>

        <NavLink
          to="saved"
          className={({ isActive }) => clsx(s.link, isActive && s.active)}
        >
          Saved Articles
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default MyProfile;
