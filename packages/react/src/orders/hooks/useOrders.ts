import {
  areOrdersFetched,
  areOrdersLoading,
  buildQueryStringFromObject,
  fetchGuestOrderLegacy as fetchGuestOrderLegacyAction,
  fetchGuestOrders as fetchGuestOrdersAction,
  fetchOrder as fetchOrderAction,
  fetchUserOrders as fetchUserOrdersAction,
  getOrdersError,
  getOrdersResult,
  resetOrderDetailsState as resetOrderDetailsStateAction,
  resetOrders,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { usePrevious } from '../../helpers';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import useUser from '../../users/hooks/useUser';
import type { Config, Order, User } from '@farfetch/blackout-client';
import type { UseOrdersOptions } from './types';

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
  const fetchGuestOrders = useAction(fetchGuestOrdersAction);
  const fetchOrder = useAction(fetchOrderAction);
  const fetchGuestOrderLegacy = useAction(fetchGuestOrderLegacyAction);
  const reset = useAction(resetOrders);
  const resetOrderDetailsState = useAction(resetOrderDetailsStateAction);
  const isLoading = useSelector(areOrdersLoading);
  const error = useSelector(getOrdersError);
  const ordersResult = useSelector(getOrdersResult);
  const isFetched = useSelector(areOrdersFetched);
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

    // By default if the user is not authenticated, it is assumed that it can
    // request for the guest orders. However, that request might not be available
    // yet for the tenant, so the tenant must control via the `enableAutoFetch` option
    // if he wants to skip fetching orders for guest users.
    return fetchGuestOrders(fetchConfig);
  }, [
    fetchConfig,
    fetchGuestOrders,
    fetchQuery,
    fetchUserOrders,
    isAuthenticated,
    userId,
  ]);

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
    error,
    isLoading,
    isFetched,
  };
}

export default useOrders;
