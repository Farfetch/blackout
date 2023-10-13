import {
  areUserSubscriptionsFetched,
  areUserSubscriptionsLoading,
  fetchUserSubscriptions,
  getUserSubscriptions,
  getUserSubscriptionsError,
  resetUserSubscriptions,
  type StoreState,
  unsubscribeSubscription,
  unsubscribeSubscriptionTopicRecipient,
  updateUserSubscriptions,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { GetSubscriptionsQuery } from '@farfetch/blackout-client';
import type { UseUserSubscriptionsOptions } from './types/index.js';

function useUserSubscriptions(
  query: GetSubscriptionsQuery,
  options: UseUserSubscriptionsOptions = {},
) {
  const store = useStore();
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector(areUserSubscriptionsLoading);
  const error = useSelector(getUserSubscriptionsError);
  const isFetched = useSelector(areUserSubscriptionsFetched);
  const userSubscriptions = useSelector(getUserSubscriptions);
  const fetch = useAction(fetchUserSubscriptions);
  const reset = useAction(resetUserSubscriptions);
  const update = useAction(updateUserSubscriptions);
  const unsubscribe = useAction(unsubscribeSubscription);
  const unsubscribeTopicRecipient = useAction(
    unsubscribeSubscriptionTopicRecipient,
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areUserSubscriptionsLoading(updatedState);
    const updatedIsFetched = areUserSubscriptionsFetched(updatedState);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, query, store]);

  return {
    isLoading,
    error,
    isFetched,
    data: userSubscriptions,
    actions: { fetch, update, unsubscribe, unsubscribeTopicRecipient, reset },
  };
}

export default useUserSubscriptions;
