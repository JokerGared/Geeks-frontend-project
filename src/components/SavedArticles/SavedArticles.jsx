// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ArticlesList from '../ArticlesList/ArticlesList';
// import { fetchFavorites } from '../../redux/favorites/operations';
// import {
//   selectFavorites,
//   selectFavoritesHasNextPage,
//   selectFavoritesLoading,
//   selectFavoritesPage,
// } from '../../redux/favorites/selectors';
// import { selectUser } from '../../redux/auth/selectors';

import { useEffect } from 'react';

// const SavedArticles = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const articles = useSelector(selectFavorites);
//   const isLoading = useSelector(selectFavoritesLoading);
//   const hasNextPage = useSelector(selectFavoritesHasNextPage);
//   const page = useSelector(selectFavoritesPage);

//   useEffect(() => {
//     if (!user?._id) return;

//     dispatch(fetchFavorites({ userId: user._id, page: 1 }));
//   }, [dispatch, user?._id]);

//   const loadMore = () => {
//     if (user?._id && hasNextPage) {
//       dispatch(fetchFavorites({ userId: user._id, page: page + 1 }));
//     }
//   };

//   return !isLoading && articles.length === 0 ? (
//     <p>No Saved Articles</p>
//   ) : (
//     <ArticlesList
//       articles={articles}
//       isLoading={isLoading}
//       hasNextPage={hasNextPage}
//       onLoadMore={loadMore}
//     />
//   );
// };

// export default SavedArticles;

const SavedArticles = () => {
  console.log('[SavedArticles] Монтуюсь');

  useEffect(() => {
    console.log('[SavedArticles] useEffect');
  }, []);
  return <p>SavedArticles</p>;
};

export default SavedArticles;
