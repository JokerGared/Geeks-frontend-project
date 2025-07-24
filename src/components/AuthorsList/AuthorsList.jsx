import s from './AuthorsList.module.css';

import AuthorsItem from '../AuthorsItem/AuthorsItem';

const AuthorsList = () => {
  const authorsList = [];

  return (
    <>
      {authorsList.map(author => (
        <li key={author.id}>
          <AuthorsItem {...author} />
        </li>
      ))}

      <button type='button'>Load more</button>
    </>
  );
};

export default AuthorsList;
