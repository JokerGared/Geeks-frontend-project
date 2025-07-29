import { useNavigate } from 'react-router-dom';
import s from './ButtonEdit.module.css';

const ButtonEdit = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-article', { state: { article } });
  };

  return (
    <button className={s.button} type="button" onClick={handleClick}>
      <svg className={s.icon} width="24px" height="24px">
        <use xlinkHref="/icons.svg#icon-edit" />
      </svg>
    </button>
  );
};

export default ButtonEdit;
