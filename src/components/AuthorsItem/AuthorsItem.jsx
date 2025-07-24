import s from './AuthorsItem.module.css';

import { Link } from 'react-router-dom';

const AuthorsItem = ({ id, avatar, name }) => {
  return (
    <div>
      <Link to={`${id}`}>
        <img src={avatar} alt={`${name}'s avatar`} />
      </Link>
    </div>
  );
};

export default AuthorsItem;
