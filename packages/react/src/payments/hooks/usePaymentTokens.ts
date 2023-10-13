import {
  arePaymentTokensFetched,
  arePaymentTokensLoading,
  fetchPaymentTokens,
  getPaymentTokens,
  getPaymentTokensError,
  removePaymentToken,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UsePaymentTokensOptions } from './types/index.js';

function usePaymentTokens(options: UsePaymentTokensOptions = {}) {
  const store = useStore();

  const { enableAutoFetch = true, fetchQuery, fetchConfig } = options;
  // Selectors
  const paymentTokens = useSelector(getPaymentTokens);
  const isLoading = useSelector(arePaymentTokensLoading);
  const error = useSelector(getPaymentTokensError);
  const isFetched = useSelector(arePaymentTokensFetched);
  // Actions
  const fetch = useAction(fetchPaymentTokens);
  const remove = useAction(removePaymentToken);

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = arePaymentTokensLoading(updatedState);
    const updatedIsFetched = arePaymentTokensFetched(updatedState);

    if (enableAutoFetch && !updatedIsLoading && !updatedIsFetched) {
      fetch(fetchQuery, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, fetchQuery, store]);

  const items = useMemo(
    () => (paymentTokens ? Object.values(paymentTokens) : undefined),
    [paymentTokens],
  );

  return {
    isLoading,
    error,
    data: { items },
    isFetched,
    actions: { fetch, remove },
  };
}

export default usePaymentTokens;
