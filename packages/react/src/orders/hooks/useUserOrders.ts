import {
  areUserOrdersFetched,
  areUserOrdersLoading,
  buildQueryStringFromObject,
  fetchGuestOrderLegacy as fetchGuestOrderLegacyAction,
  fetchOrder as fetchOrderAction,
  fetchUserOrders as fetchUserOrdersAction,
  getUserOrdersError,
  getUserOrdersResult,
  getUserOrdersResultByOrderId,
  isAuthenticated as isAuthenticatedSelector,
  resetOrderDetailsState as resetOrderDetailsStateAction,
  resetOrders,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { usePrevious } from '../../helpers/index.js';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import useUser from '../../users/hooks/useUser.js';
import type { Config, Order, User } from '@farfetch/blackout-client';
import type { UseUserOrdersOptions } from './types/index.js';

/**
 * Obtains the user orders and actions to perform on them.
 */
function useUserOrders(options: UseUserOrdersOptions = {}) {
  const { enableAutoFetch = true, fetchConfig, fetchQuery } = options;

  const fetchUserOrders = useAction(fetchUserOrdersAction);
  const fetchOrder = useAction(fetchOrderAction);
  const fetchGuestOrderLegacy = useAction(fetchGuestOrderLegacyAction);
  const reset = useAction(resetOrders);
  const resetOrderDetailsState = useAction(resetOrderDetailsStateAction);
  const isLoading = useSelector((state: StoreState) =>
    areUserOrdersLoading(state, fetchQuery),
  );
  const error = useSelector((state: StoreState) =>
    getUserOrdersError(state, fetchQuery),
  );
  const ordersResult = useSelector((state: StoreState) =>
    getUserOrdersResult(state, fetchQuery),
  );
  const ordersResultByOrderId = useSelector((state: StoreState) =>
    getUserOrdersResultByOrderId(state, fetchQuery),
  );
  const isFetched = useSelector((state: StoreState) =>
    areUserOrdersFetched(state, fetchQuery),
  );
  const { data: user } = useUser();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const userId = user?.id;

  const queryHash = useMemo(() => {
    if (!fetchQuery) {
      return '';
    }

    return buildQueryStringFromObject(fetchQuery);
  }, [fetchQuery]);

  const previousQueryHash = usePrevious(queryHash) || '';
  const hasQueryHashChanged = previousQueryHash !== queryHash;

  const fetch = useCallback(() => {
    if (isAuthenticated) {
      // If the user is authenticated, userId is not undefined, so the
      // cast is valid.
      return fetchUserOrders(userId as User['id'], fetchQuery, fetchConfig);
    }

    return Promise.reject(new Error('User is not authenticated'));
  }, [fetchConfig, fetchQuery, fetchUserOrders, isAuthenticated, userId]);

  const fetchOrderDetails = useCallback(
    (orderId: Order['id'], guestUserEmail?: string | null, config?: Config) => {
      if (!orderId) {
        return Promise.reject(
          new Error(
            'Invalid `orderId` parameter was provided for `fetchOrderDetails`',
          ),
        );
      }

      if (isAuthenticated && guestUserEmail) {
        return Promise.reject(
          new Error(
            '`guestUserEmail` parameter was provided but the current user is authenticated',
          ),
        );
      }

      const useLegacyEndpointForGuest = !!guestUserEmail;

      return useLegacyEndpointForGuest
        ? fetchGuestOrderLegacy(orderId, { guestUserEmail }, config)
        : fetchOrder(orderId, config);
    },
    [fetchGuestOrderLegacy, fetchOrder, isAuthenticated],
  );

  useEffect(() => {
    if (
      ((!isLoading && !isFetched) || hasQueryHashChanged) &&
      enableAutoFetch
    ) {
      fetch();
    }
  }, [enableAutoFetch, fetch, hasQueryHashChanged, isFetched, isLoading]);

  const data = useMemo(() => {
    if (!ordersResult && !ordersResultByOrderId) {
      return undefined;
    }

    return { ordersResult, ordersResultByOrderId };
  }, [ordersResult, ordersResultByOrderId]);

  return {
    actions: {
      fetch,
      fetchOrderDetails,
      reset,
      resetOrderDetailsState,
    },
    data,
    error,
    isLoading,
    isFetched,
  };
}

export default useUserOrders;
