import {
  areUserClosetItemsFetched,
  areUserClosetItemsLoading,
  fetchUserClosetItems as fetchUserClosetItemsAction,
  getUserClosetItemsError,
  getUserClosetItemsResult,
  isAuthenticated as isAuthenticatedSelector,
  removeUserClosetItem as removeUserClosetItemAction,
  resetUserClosetItems,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import useUser from './useUser.js';
import type {
  Closet,
  ClosetItem,
  Config,
  GetUserClosetItemsQuery,
  User,
} from '@farfetch/blackout-client';
import type { UseUserClosetItemsOptions } from './types/index.js';

function useUserClosetItems(
  closetId: Closet['id'],
  options: UseUserClosetItemsOptions = {},
) {
  const closetIdHookParameter = closetId;
  const { enableAutoFetch = true, fetchConfig, fetchQuery } = options;
  const { data: user } = useUser();
  const userId = user?.id;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const fetchUserClosetItems = useAction(fetchUserClosetItemsAction);
  const removeUserClosetItemActionDispatcher = useAction(
    removeUserClosetItemAction,
  );
  const reset = useAction(resetUserClosetItems);
  const isFetched = useSelector(areUserClosetItemsFetched);
  const isLoading = useSelector(areUserClosetItemsLoading);
  const userClosetItems = useSelector(getUserClosetItemsResult);
  const error = useSelector(getUserClosetItemsError);

  /**
   * Fetches an user closet. If no closetId is passed, the one passed to the hook will be used.
   * Will throw an error if no closet id is provided to either the hook or the `closetId` parameter.
   *
   * @param query - Query to filter the api request.
   * @param config - Custom configurations to send to the client instance (axios).
   * @param closetId - Closet id to override the one provided by the hook, if any.
   *
   * @returns - Promise that will be resolved when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      query: GetUserClosetItemsQuery | undefined = fetchQuery,
      config: Config | undefined = fetchConfig,
      closetId: Closet['id'] | undefined = closetIdHookParameter,
    ) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      if (!closetId) {
        return Promise.reject(new Error('No closetId provided'));
      }

      return fetchUserClosetItems(
        userId as User['id'],
        closetId,
        query,
        config,
      );
    },
    [
      fetchUserClosetItems,
      isAuthenticated,
      userId,
      fetchConfig,
      closetIdHookParameter,
      fetchQuery,
    ],
  );

  /**
   * Removes an item from the user closet. If no closetId is passed, the one passed to the hook will be used.
   * Will throw an error if no closet id or item id is provided to either the hook (for the closet id) or
   * the `closetId` and `itemId` parameters.
   *
   * @param itemId - Identifier of the item to be removed from the closet.
   * @param config - Custom configurations to send to the client instance (axios).
   * @param closetId - Closet id to override the one provided by the hook, if any.
   *
   * @returns - Promise that will be resolved when the call to the endpoint finishes.
   */
  const removeUserClosetItem = useCallback(
    (
      itemId: ClosetItem['id'],
      config: Config | undefined = fetchConfig,
      closetId: Closet['id'] | undefined = closetIdHookParameter,
    ) => {
      if (!isAuthenticated) {
        return Promise.reject(new Error('User is not authenticated'));
      }

      if (!closetId) {
        return Promise.reject(new Error('No closetId provided'));
      }

      if (!itemId) {
        return Promise.reject(new Error('No itemId provided'));
      }

      return removeUserClosetItemActionDispatcher(
        userId as User['id'],
        closetId,
        itemId,
        config,
      );
    },
    [
      isAuthenticated,
      removeUserClosetItemActionDispatcher,
      userId,
      fetchConfig,
      closetIdHookParameter,
    ],
  );

  useEffect(() => {
    if (
      enableAutoFetch &&
      !isFetched &&
      !isLoading &&
      isAuthenticated &&
      closetIdHookParameter
    ) {
      fetch(fetchQuery, fetchConfig, closetIdHookParameter);
    }
  }, [
    enableAutoFetch,
    fetchConfig,
    fetch,
    isAuthenticated,
    closetIdHookParameter,
    fetchQuery,
    isFetched,
    isLoading,
  ]);

  const data = useMemo(() => {
    if (!userClosetItems) {
      return undefined;
    }

    return userClosetItems;
  }, [userClosetItems]);

  return {
    data,
    isFetched,
    isLoading,
    error,
    actions: {
      fetch,
      removeUserClosetItem,
      reset,
    },
  };
}

export default useUserClosetItems;
