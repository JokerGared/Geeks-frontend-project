import { Link } from 'react-router-dom';
import s from './ButtonEdit.module.css';

const ButtonEdit = ({ to, className = 'button', children }) => {
  return (
    <Link to={to} className={s[className]} aria-label="Edit article">
      <p>{children}</p>
      <svg className={s.icon} width="24px" height="24px">
        <use xlinkHref="/icons.svg#icon-edit" />
      </svg>
    </Link>
  );
};

export default ButtonEdit;
