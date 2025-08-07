import clsx from 'clsx';
import s from './AuthorsItem.module.css';
import { Link, useLocation } from 'react-router-dom';

const AuthorsItem = ({ _id, name, avatarUrl, avatarClassName = '' }) => {
  const authorName = name.split(' ')[0];
  const location = useLocation();
  const isInAuthors = location.pathname.startsWith('/authors');
  return (
    <Link to={`/authors/${_id}`} className={s.card}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className={clsx(s.avatar, avatarClassName)}
        />
      ) : (
        <div
          className={isInAuthors ? s.fallbackAvatarAuthors : s.fallbackAvatar}
        >
          {name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </div>
      )}
      <p className={s.name}>{authorName}</p>
    </Link>
  );
};

export default AuthorsItem;
