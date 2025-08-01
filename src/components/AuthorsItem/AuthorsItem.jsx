import s from './AuthorsItem.module.css';
import { Link } from 'react-router-dom';

const AuthorsItem = ({ id, avatarUrl, name, avatarClassName }) => {
  const authorName = name.split(' ')[0];

  return (
    <Link to={`/authors/${id}`} className={s.card}>
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className={`${s.avatar} ${avatarClassName}`}
      />
      <p className={s.name}>{authorName}</p>
    </Link>
  );
};

export default AuthorsItem;
