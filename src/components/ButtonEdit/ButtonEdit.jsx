import { Link } from 'react-router-dom';
import s from './ButtonEdit.module.css';

const ButtonEdit = ({ to }) => {
  return (
    <Link to={to} className={s.button} aria-label="Edit article">
      <svg className={s.icon} width="24px" height="24px">
        <use xlinkHref="/icons.svg#icon-edit" />
      </svg>
    </Link>
  );
};

export default ButtonEdit;
