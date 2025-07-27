// import s from './AuthorsList.module.css';
// import AuthorsItem from '../AuthorsItem/AuthorsItem';

// const authorsList = [
//   { id: '1', avatar: 'https://i.pravatar.cc/150?img=1', name: 'Naomi' },
//   { id: '2', avatar: 'https://i.pravatar.cc/150?img=2', name: 'Andrii' },
//   { id: '3', avatar: 'https://i.pravatar.cc/150?img=3', name: 'Emma' },
//   { id: '4', avatar: 'https://i.pravatar.cc/150?img=4', name: 'Max' },
//   { id: '5', avatar: 'https://i.pravatar.cc/150?img=5', name: 'Tony' },
//   { id: '6', avatar: 'https://i.pravatar.cc/150?img=6', name: 'Tailor' },
//   // ... up to 20 items
// ];

// const AuthorsList = () => {
//   <div>
//     <ul className={s.list}>
//       {authorsList.map((author) => (
//         <li key={author.id} className={s.item}>
//           <AuthorsItem {...author} />
//         </li>
//       ))}
//     </ul>
//     <button type="button" className={s.loadMore}>
//       Load more
//     </button>
//   </div>;
// };

// export default AuthorsList;

// import { useEffect, useState } from 'react';
// import s from './AuthorsList.module.css';
// import AuthorsItem from '../AuthorsItem/AuthorsItem';

// const AuthorsList = () => {
//   const [authors, setAuthors] = useState([]);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchAuthors = async () => {
//       try {
//         const res = await fetch(
//           `https://your-api.com/api/authors?page=${page}`,
//         );
//         if (!res.ok) throw new Error('Failed to fetch authors');
//         const data = await res.json();
//         setAuthors((prev) => [...prev, ...data]);
//       } catch (err) {
//         console.error('Error loading authors:', err);
//       }
//     };

//     fetchAuthors();
//   }, [page]);

//   const handleLoadMore = () => {
//     setPage((prev) => prev + 1);
//   };

//   return (
//     <div>
//       <ul className={s.list}>
//         {authors.map((author) => (
//           <li key={author.id} className={s.item}>
//             <AuthorsItem {...author} />
//           </li>
//         ))}
//       </ul>
//       <button type="button" className={s.loadMore} onClick={handleLoadMore}>
//         Load more
//       </button>
//     </div>
//   );
// };

// export default AuthorsList;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors, nextPage } from '../../store/authorsSlice';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import s from './AuthorsList.module.css';

const AuthorsList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, page } = useSelector((state) => state.authors);

  useEffect(() => {
    dispatch(fetchAuthors(page));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    dispatch(nextPage());
  };

  return (
    <div>
      <ul className={s.list}>
        {items.map((author) => (
          <li key={author.id} className={s.item}>
            <AuthorsItem {...author} />
          </li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}
      {error && <p className={s.error}>Error: {error}</p>}

      <button
        type="button"
        className={s.loadMore}
        onClick={handleLoadMore}
        disabled={loading}
      >
        Load more
      </button>
    </div>
  );
};

export default AuthorsList;
