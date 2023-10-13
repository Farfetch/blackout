import {
  areCheckoutOrderDetailsFetched,
  areCheckoutOrderDetailsLoading,
  fetchCheckoutOrderDetails,
  getCheckoutOrderDetails,
  getCheckoutOrderDetailsError,
  resetCheckout,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { CheckoutOrder, Config } from '@farfetch/blackout-client';
import type { UseCheckoutOrderDetailsOptions } from './types/index.js';

function useCheckoutOrderDetails(
  checkoutOrderId?: CheckoutOrder['id'],
  options: UseCheckoutOrderDetailsOptions = {},
) {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector(areCheckoutOrderDetailsLoading);
  const error = useSelector(getCheckoutOrderDetailsError);
  const isFetched = useSelector(areCheckoutOrderDetailsFetched);
  const details = useSelector(getCheckoutOrderDetails);
  const fetchCheckoutOrderDetailsAction = useAction(fetchCheckoutOrderDetails);
  const reset = useAction(resetCheckout);

  const fetch = useCallback(
    (config: Config | undefined = fetchConfig) => {
      if (!checkoutOrderId) {
        return Promise.reject(new Error('Invalid checkout order id.'));
      }

      return fetchCheckoutOrderDetailsAction(checkoutOrderId, config);
    },
    [checkoutOrderId, fetchCheckoutOrderDetailsAction, fetchConfig],
  );

  const checkoutOrderIdFromDetails = details?.checkoutOrder?.id;

  // If checkoutOrderId parameter was passed and it is different
  // than the current checkoutOrderId in the store, reset all details data
  // in redux.
  if (
    checkoutOrderId &&
    checkoutOrderIdFromDetails &&
    checkoutOrderIdFromDetails !== checkoutOrderId
  ) {
    reset();
  }

  useEffect(() => {
    const updatedState = store.getState() as StoreState;
    const updatedIsLoading = areCheckoutOrderDetailsLoading(updatedState);
    const updatedIsFetched = areCheckoutOrderDetailsFetched(updatedState);

    if (
      !updatedIsLoading &&
      !updatedIsFetched &&
      enableAutoFetch &&
      checkoutOrderId
    ) {
      fetch();
    }
  }, [checkoutOrderId, enableAutoFetch, fetch, isFetched, isLoading, store]);

  return {
    actions: {
      fetch,
      reset,
    },
    data: details,
    isLoading,
    isFetched,
    error,
  };
}

export default useCheckoutOrderDetails;
