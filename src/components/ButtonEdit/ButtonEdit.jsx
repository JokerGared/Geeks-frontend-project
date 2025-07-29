import clsx from 'clsx';
import s from './ButtonEdit.module.css';

const ButtonEdit = () => {
  return (
    <button className={s.edit} type="button">
      <svg className={s.icon} width="24px" height="24px">
        <use xlinkHref="/icons.svg#icon-edit" />
      </svg>
    </button>
  );
};

export default ButtonEdit;
