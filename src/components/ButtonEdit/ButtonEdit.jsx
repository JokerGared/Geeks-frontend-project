import clsx from 'clsx';

import s from './ButtonAddToBookmarks.module.css';

const ButtonEdit = ({ article }) => {
  const buttonClass = clsx(s.button, { [s.active]: isSaved });

  return (
    <button className={buttonClass} type="button" onClick={handleClick}>
      {isLoading ? (
        <Loader size={24} />
      ) : (
        <svg className={s.icon} width="24px" height="24px">
          <use xlinkHref="/icons.svg#icon-edit" />
        </svg>
      )}
    </button>
  );
};

export default ButtonEdit;
