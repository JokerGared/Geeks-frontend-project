import AuthorsItem from '../AuthorsItem/AuthorsItem';
import s from './AuthorsList.module.css';

const AuthorsList = ({ authors }) => {
  return (
    <ul className={s.list}>
      {authors.map((author) => (
        <li key={author._id} className={s.item}>
          <AuthorsItem {...author} />
        </li>
      ))}
    </ul>
  );
};

export default AuthorsList;
