import clsx from 'clsx';
import s from './AuthorsItem.module.css';
import { Link } from 'react-router-dom';

const AuthorsItem = ({ _id, name, avatarUrl, avatarClassName = '' }) => {
  return (
    <Link to={`/authors/${_id}`} className={s.card}>
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className={clsx(s.avatar, avatarClassName)}
      />
      <p className={s.name}>{name}</p>
    </Link>
  );
};

export default AuthorsItem;
