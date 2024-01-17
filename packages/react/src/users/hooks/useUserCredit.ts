import {
  areUserCreditMovementsFetched as areUserCreditMovementsFetchedSelector,
  areUserCreditMovementsLoading as areUserCreditMovementsLoadingSelector,
  areUserCreditsFetched,
  areUserCreditsLoading,
  fetchUserCreditMovements as fetchUserCreditMovementsAction,
  fetchUserCredits as fetchUserCreditsAction,
  getUserCreditMovements,
  getUserCreditMovementsError as getUserCreditMovementsErrorSelector,
  getUserCredits,
  getUserCreditsError,
  isAuthenticated as isAuthenticatedSelector,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import useUser from './useUser.js';
import type { Config, User } from '@farfetch/blackout-client';
import type { UseUserCreditOptions } from './types/index.js';

function useUserCredit(options: UseUserCreditOptions = {}) {
  const store = useStore();

  const {
    enableAutoFetch = true,
    fetchConfig,
    queryUserCreditMovements = { pageSize: 10 },
  } = options;
  const { data: user } = useUser();
  const userId = user?.id;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const fetchUserCredits = useAction(fetchUserCreditsAction);
  const fetchUserCreditMovementsActionDispatcher = useAction(
    fetchUserCreditMovementsAction,
  );
  const userCredits = getUserCredits(user);
  const isLoading = useSelector(areUserCreditsLoading);
  const error = useSelector(getUserCreditsError);
  const isFetched = useSelector(areUserCreditsFetched);
  const userCreditMovements = getUserCreditMovements(user);
  const areMovementsLoading = useSelector(
    areUserCreditMovementsLoadingSelector,
  );
  const movementsError = useSelector(getUserCreditMovementsErrorSelector);
  const areMovementsFetched = useSelector(
    areUserCreditMovementsFetchedSelector,
  );

  /**
   * Fetches all user credits.
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

      return fetchUserCredits(userId as User['id'], config);
    },
    [fetchUserCredits, isAuthenticated, userId, fetchConfig],
  );

  /**
   * Fetches all user credit movements.
   * Will throw an error if the user is not authenticated.
   *
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns - Promise that will be resolved when the call to the endpoint finishes.
   */
  const fetchMovements = useCallback(
    (config: Config | undefined = fetchConfig) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      return fetchUserCreditMovementsActionDispatcher(
        userId as User['id'],
        queryUserCreditMovements,
        config,
      );
    },
    [
      fetchConfig,
      isAuthenticated,
      fetchUserCreditMovementsActionDispatcher,
      userId,
      queryUserCreditMovements,
    ],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areUserCreditsLoading(updatedState);
    const updatedIsFetched = areUserCreditsFetched(updatedState);

    if (
      enableAutoFetch &&
      !updatedIsFetched &&
      !updatedIsLoading &&
      isAuthenticated
    ) {
      fetch(fetchConfig);
    }
  }, [enableAutoFetch, fetchConfig, fetch, isAuthenticated, isLoading, store]);

  const data = useMemo(() => {
    if (!userCredits && !userCreditMovements) {
      return undefined;
    }

    return { userCredits, userCreditMovements };
  }, [userCredits, userCreditMovements]);

  return {
    data,
    isLoading,
    error,
    isFetched,
    areMovementsLoading,
    movementsError,
    areMovementsFetched,
    actions: {
      fetch,
      fetchMovements,
    },
  };
}

export default useUserCredit;
