import { useLocation, Link } from 'react-router-dom';
import s from './SubscriptionsEmpty.module.css';

const SubscriptionsEmpty = () => {
  return (
    <div className={s.emptyWrapper}>
      <div className={s.infoWapper}>
        <svg className={s.icon} width="64px" height="64">
          <use xlinkHref="/icons.svg#icon-notification" />
        </svg>

        <h3 className={s.title}>Nothing found.</h3>
        <p>Subscribe to the first author</p>
      </div>

      <Link to="/authors" className={s.button}>
        Go to authors
      </Link>
    </div>
  );
};

export default SubscriptionsEmpty;
