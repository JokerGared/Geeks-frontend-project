// import s from './AuthorsItem.module.css';
// import { Link } from 'react-router-dom';

// const AuthorsItem = ({ id, avatar, name }) => {
//   return (
//     <Link to={`/authors/${id}`} className={s.card}>
//       <img src={avatar} alt={`${name}'s avatar`} className={s.avatar} />
//       <p className={s.name}>{name}</p>
//     </Link>
//   );
// };

import s from './AuthorsItem.module.css';
import { Link } from 'react-router-dom';

const AuthorsItem = ({ id, avatar, name, avatarClassName = '' }) => {
  return (
    <Link to={`/authors/${id}`} className={s.card}>
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className={`${s.avatar} ${avatarClassName}`}
      />
      <p className={s.name}>{name}</p>
    </Link>
  );
};

export default AuthorsItem;
