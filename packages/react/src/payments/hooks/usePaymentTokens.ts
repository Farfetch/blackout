import {
  arePaymentTokensFetched,
  arePaymentTokensLoading,
  fetchPaymentTokens,
  getPaymentTokens,
  getPaymentTokensError,
  removePaymentToken,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { UsePaymentTokensOptions } from './types';

function usePaymentTokens(options: UsePaymentTokensOptions = {}) {
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
    if (enableAutoFetch && !isLoading && !error && !isFetched) {
      fetch(fetchQuery, fetchConfig);
    }
  }, [
    enableAutoFetch,
    error,
    fetch,
    fetchConfig,
    fetchQuery,
    isFetched,
    isLoading,
  ]);

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
