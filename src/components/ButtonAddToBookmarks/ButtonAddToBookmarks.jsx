import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import s from './ButtonAddToBookmarks.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/operations';

const ButtonAddToBookmarks = ({ article }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector((state) => state.favorites.isLoading);
  const error = useSelector((state) => state.favorites.error);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const isSaved = favorites.some((item) => item._id === article._id);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(openModal('ErrorSave'));
      return;
    }
    if (isSaved) {
      dispatch(removeFromFavorites(article._id));
    } else dispatch(addToFavorites(article));
  };
  const buttonClass = clsx(s.button, { [s.active]: isSaved });

  return (
    <button className={buttonClass} type="button" onClick={handleClick}>
      {isLoading ? (
        <Loader size={24} />
      ) : (
        <svg className={s.icon} width="24px" height="24px">
          <use xlinkHref="/icons.svg#icon-save" />
        </svg>
      )}
    </button>
  );
};

export default ButtonAddToBookmarks;
