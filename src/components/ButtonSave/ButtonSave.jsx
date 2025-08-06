import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import s from './ButtonSave.module.css';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/slice';
import { MODALS } from '../../constants/modals';

import { selectFavorites } from '../../redux/favorites/selectors';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/operations';

import toast from 'react-hot-toast';

const ButtonSave = ({ article }) => {
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
      dispatch(openModal({ type: MODALS.MODAL_ERROR_SAVE }));
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
      console.error(err);
    }
  };

  const buttonClass = clsx(s['save-button'], { [s.active]: isSaved });
  return (
    <button type="button" onClick={handleClick} className={buttonClass}>
      <span className={s['save-button-text']}>Save</span>
      <svg
        className={clsx(s['save-icon'], isLoading && s.spin)}
        width="24px"
        height="24px"
      >
        <use href="/icons.svg#icon-save" />
      </svg>
    </button>
  );
};

export default ButtonSave;
