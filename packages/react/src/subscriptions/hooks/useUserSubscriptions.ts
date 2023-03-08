import {
  areUserSubscriptionsFetched,
  areUserSubscriptionsLoading,
  fetchUserSubscriptions,
  getUserSubscriptions,
  getUserSubscriptionsError,
  resetUserSubscriptions,
  unsubscribeSubscription,
  unsubscribeSubscriptionTopicRecipient,
  updateUserSubscriptions,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { GetSubscriptionsQuery } from '@farfetch/blackout-client';
import type { UseUserSubscriptionsOptions } from './types/index.js';

function useUserSubscriptions(
  query: GetSubscriptionsQuery,
  options: UseUserSubscriptionsOptions = {},
) {
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
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, error, fetch, fetchConfig, isFetched, isLoading, query]);

  return {
    isLoading,
    error,
    isFetched,
    data: userSubscriptions,
    actions: { fetch, update, unsubscribe, unsubscribeTopicRecipient, reset },
  };
}

export default useUserSubscriptions;
