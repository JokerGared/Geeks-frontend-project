import clsx from 'clsx';
import s from './AuthorsItem.module.css';
import { Link } from 'react-router-dom';

const AuthorsItem = ({ _id, name, avatarUrl, avatarClassName = '' }) => {
  const authorName = name.split(' ')[0];
  return (
    <Link to={`/authors/${_id}`} className={s.card}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className={clsx(s.avatar, avatarClassName)}
        />
      ) : (
        <div className={s.fallbackAvatar}>
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
