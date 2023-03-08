import {
  arePaymentIntentInstrumentsFetched as arePaymentIntentInstrumentsFetchedSelector,
  arePaymentIntentInstrumentsLoading as arePaymentIntentInstrumentsLoadingSelector,
  createPaymentIntentInstrument,
  fetchPaymentIntentInstruments,
  getPaymentIntentInstruments,
  getPaymentIntentInstrumentsError,
  removePaymentIntentInstrument,
  resetPaymentIntentInstrumentsState,
  updatePaymentIntentInstrument,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type {
  Config,
  PaymentInstrument,
  PaymentIntent,
  PostPaymentIntentInstrumentData,
  PutPaymentIntentInstrumentData,
} from '@farfetch/blackout-client';
import type { UsePaymentIntentInstrumentsOptions } from './types/index.js';

function usePaymentIntentInstruments(
  paymentIntentId?: PaymentIntent['id'],
  options: UsePaymentIntentInstrumentsOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  const areInstrumentsLoading = useSelector(
    arePaymentIntentInstrumentsLoadingSelector,
  );
  const instrumentsError = useSelector(getPaymentIntentInstrumentsError);
  const instrumentEntities = useSelector(getPaymentIntentInstruments);
  const areInstrumentsFetched = useSelector(
    arePaymentIntentInstrumentsFetchedSelector,
  );

  const fetchInstrumentsAction = useAction(fetchPaymentIntentInstruments);
  const createInstrumentAction = useAction(createPaymentIntentInstrument);
  const updateInstrumentAction = useAction(updatePaymentIntentInstrument);
  const removeInstrumentAction = useAction(removePaymentIntentInstrument);
  const resetInstrumentsState = useAction(resetPaymentIntentInstrumentsState);

  const instruments = useMemo(() => {
    return instrumentEntities ? Object.values(instrumentEntities) : undefined;
  }, [instrumentEntities]);

  const fetch = useCallback(
    (config: Config | undefined = fetchConfig) => {
      if (!paymentIntentId) {
        return Promise.reject(new Error('Missing payment intent id.'));
      }

      return fetchInstrumentsAction(paymentIntentId, config);
    },
    [fetchConfig, paymentIntentId, fetchInstrumentsAction],
  );

  const create = useCallback(
    (data: PostPaymentIntentInstrumentData, config?: Config) => {
      if (!paymentIntentId) {
        return Promise.reject(new Error('Missing payment intent id.'));
      }

      return createInstrumentAction(paymentIntentId, data, config);
    },
    [paymentIntentId, createInstrumentAction],
  );

  const update = useCallback(
    (
      paymentInstrumentId: PaymentInstrument['id'],
      data: PutPaymentIntentInstrumentData,
      config?: Config,
    ) => {
      if (!paymentIntentId) {
        return Promise.reject(new Error('Missing payment intent id.'));
      }

      if (!paymentInstrumentId) {
        return Promise.reject(
          new Error(
            'Invalid `paymentInstrumentId` parameter was provided for `updateInstrument`',
          ),
        );
      }

      return updateInstrumentAction(
        paymentIntentId,
        paymentInstrumentId,
        data,
        config,
      );
    },
    [paymentIntentId, updateInstrumentAction],
  );

  const remove = useCallback(
    (paymentInstrumentId: PaymentInstrument['id'], config?: Config) => {
      if (!paymentIntentId) {
        return Promise.reject(new Error('Missing payment intent id.'));
      }

      if (!paymentInstrumentId) {
        return Promise.reject(
          new Error(
            'Invalid `paymentInstrumentId` parameter was provided for `removeInstrument`',
          ),
        );
      }

      return removeInstrumentAction(
        paymentIntentId,
        paymentInstrumentId,
        config,
      );
    },
    [paymentIntentId, removeInstrumentAction],
  );

  const reset = useCallback(() => {
    resetInstrumentsState();
  }, [resetInstrumentsState]);

  useEffect(() => {
    if (
      !areInstrumentsLoading &&
      !areInstrumentsFetched &&
      enableAutoFetch &&
      paymentIntentId
    ) {
      fetch();
    }
  }, [
    areInstrumentsFetched,
    areInstrumentsLoading,
    enableAutoFetch,
    fetch,
    fetchConfig,
    paymentIntentId,
  ]);

  return {
    actions: {
      fetch,
      create,
      update,
      remove,
      reset,
    },
    data: instruments,
    isLoading: areInstrumentsLoading,
    isFetched: areInstrumentsFetched,
    error: instrumentsError,
  };
}

export default usePaymentIntentInstruments;
