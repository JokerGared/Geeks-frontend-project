import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import s from './ButtonAddToBookmarks.module.css';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/slice';
import { selectFavorites } from '../../redux/favorites/selectors';

import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/operations';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';

const ButtonAddToBookmarks = ({ article }) => {
  const dispatch = useDispatch();

  if (!article || !article._id) return null;

  const favorites = useSelector(selectFavorites);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector((state) => state.favorites.isLoading);
  const error = useSelector((state) => state.favorites.error);

  const isSaved =
    Array.isArray(favorites) &&
    favorites.some((item) => item?._id === article._id);

  const handleClick = async () => {
    if (!isLoggedIn) {
      dispatch(openModal('ErrorSave'));
      return;
    }
    try {
      if (isSaved) {
        await dispatch(
          removeFromFavorites({ articleId: article._id }),
        ).unwrap();
      } else {
        await dispatch(addToFavorites({ article })).unwrap();
      }
    } catch (err) {
      toast.error('Failed to update favorites');
    }
  };

  if (error) toast.error(error);

  const buttonClass = clsx(s.button, { [s.active]: isSaved });

  return (
    <button className={buttonClass} type="button" onClick={handleClick}>
      <svg
        className={clsx(s.icon, isLoading && s.spin)}
        width="24px"
        height="24px"
      >
        <use xlinkHref="/icons.svg#icon-save" />
      </svg>
    </button>
  );
};

export default ButtonAddToBookmarks;
