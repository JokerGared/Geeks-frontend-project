import { useDispatch, useSelector } from 'react-redux';

import { selectSubscriptions } from '../../redux/subscriptions/selectors';
import { fetchSubscriptions } from '../../redux/subscriptions/operations';
import { selectIsLoading } from '../../redux/loading/selectors';
import SubscriptionsEmpty from '../SubscriptionsEmpty/SubscriptionsEmpty';
import AuthorsList from '../AuthorsList/AuthorsList';
import { useEffect } from 'react';

const Subscriptions = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector(selectSubscriptions);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  return !isLoading && subscriptions.length === 0 ? (
    <SubscriptionsEmpty />
  ) : (
    <AuthorsList authors={subscriptions} />
  );
};

export default Subscriptions;
