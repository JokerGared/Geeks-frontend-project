import { useDispatch, useSelector } from 'react-redux';
import s from './SubscribeButton.module.css';
import { selectIsSubscribed } from '../../redux/subscriptions/selectors.js';
import {
  subscribeToAuthor,
  unsubscribeFromAuthor,
} from '../../redux/subscriptions/operations.js';
import { selectIsLoading } from '../../redux/loading/selectors.js';
import { useParams } from 'react-router-dom';

const SubscribeButton = () => {
  const dispatch = useDispatch();
  const { authorId } = useParams();
  const isSubscribed = useSelector(selectIsSubscribed(authorId));

  const handleToggleSubscription = () => {
    if (!authorId) return;
    if (isSubscribed) {
      dispatch(unsubscribeFromAuthor(authorId));
    } else {
      dispatch(subscribeToAuthor(authorId));
    }
  };

  return (
    <>
      {isSubscribed ? (
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
