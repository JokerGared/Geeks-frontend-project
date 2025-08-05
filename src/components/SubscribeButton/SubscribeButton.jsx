import { useDispatch, useSelector } from 'react-redux';
import s from './SubscribeButton.module.css';
import {
  selectIsSubscribed,
  selectSubscriptionsLoading,
} from '../../redux/subscriptions/selectors.js';
import { selectCurrentAuthor } from '../../redux/authors/selectors.js';

const SubscribeButton = () => {
  const dispatch = useDispatch();
  const author = useSelector(selectCurrentAuthor);
  const isSubscribed = useSelector(selectIsSubscribed(author?._id));
  const loading = useSelector(selectSubscriptionsLoading);

  const handleToggleSubscription = () => {
    if (!author?._id) return;
    if (isSubscribed) {
      dispatch(unsubscribeFromAuthor(author._id));
    } else {
      dispatch(subscribeToAuthor(author._id));
    }
  };

  return (
    <>
      {loading ? (
        <span className={s.loading}>Loading...</span>
      ) : isSubscribed ? (
        <button
          type="button"
          onClick={handleToggleSubscription}
          className={s.unsubscribe}
        >
          Unsubscribe
        </button>
      ) : (
        <button
          type="button"
          onClick={handleToggleSubscription}
          className={s.subscribe}
        >
          Subscribe
        </button>
      )}
    </>
  );
};

export default SubscribeButton;
