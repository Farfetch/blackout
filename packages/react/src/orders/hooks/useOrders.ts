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
import type { UseOrdersOptions } from './types/index.js';

/**
 * Obtains the user orders and actions to perform on them.
 *
 * Important: The implementation imposes the way that the orders reducer
 * implementation works, which is, you cannot request
 * user orders with different query parameters between them
 * in more than 1 component at the same time, as there is not a necessity to have so.
 * If you need to request the same user orders in 2 different components at
 * the same time with different query parameters, do not use this hook or the default
 * orders reducer implementation.
 */
function useOrders(options: UseOrdersOptions = {}) {
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
  const { data: user, isFetched: isUserFetched } = useUser();
  const isAuthenticated = isUserFetched && user && !user.isGuest;
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
        ? fetchGuestOrderLegacy(orderId, guestUserEmail as string, config)
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

  return {
    actions: {
      fetch,
      fetchOrderDetails,
      reset,
      resetOrderDetailsState,
    },
    data: ordersResult,
    dataByOrderId: ordersResultByOrderId,
    error,
    isLoading,
    isFetched,
  };
}

export default useOrders;
