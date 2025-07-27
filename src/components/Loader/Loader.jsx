import { ClipLoader } from 'react-spinners';
import s from './Loader.module.css';

const Loader = ({ size = 24 }) => {
  return (
    <div className={s.loader}>
      <ClipLoader color="#1b831bbf" size={size} />
    </div>
  );
};

export default Loader;
