import {
  areUserClosetsFetched,
  areUserClosetsLoading,
  fetchUserClosets as fetchUserClosetsAction,
  getUserClosets,
  getUserClosetsError,
  isAuthenticated as isAuthenticatedSelector,
  resetUserClosets,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import useUser from './useUser.js';
import type { Config, User } from '@farfetch/blackout-client';
import type { UseUserClosetsOptions } from './types/index.js';

function useUserClosets(options: UseUserClosetsOptions = {}) {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;
  const { data: user } = useUser();
  const userId = user?.id;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const fetchUserClosets = useAction(fetchUserClosetsAction);
  const reset = useAction(resetUserClosets);
  const isFetched = useSelector(areUserClosetsFetched);
  const isLoading = useSelector(areUserClosetsLoading);
  const userClosets = useSelector(getUserClosets);
  const error = useSelector(getUserClosetsError);

  /**
   * Fetches all user closets.
   * Will throw an error if the user is not authenticated.
   *
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns - Promise that will be resolved when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (config: Config | undefined = fetchConfig) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return fetchUserClosets(userId as User['id'], config);
    },
    [fetchUserClosets, isAuthenticated, userId, fetchConfig],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areUserClosetsLoading(updatedState);
    const updatedIsFetched = areUserClosetsFetched(updatedState);

    if (
      enableAutoFetch &&
      !updatedIsFetched &&
      !updatedIsLoading &&
      isAuthenticated
    ) {
      fetch(fetchConfig);
    }
  }, [
    enableAutoFetch,
    fetchConfig,
    fetch,
    isAuthenticated,
    isFetched,
    isLoading,
    store,
  ]);

  const data = useMemo(() => {
    if (!userClosets) {
      return undefined;
    }

    return userClosets;
  }, [userClosets]);

  return {
    data,
    isFetched,
    isLoading,
    error,
    actions: {
      fetch,
      reset,
    },
  };
}

export default useUserClosets;
