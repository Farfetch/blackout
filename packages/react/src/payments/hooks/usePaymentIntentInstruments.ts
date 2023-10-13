import {
  arePaymentIntentInstrumentsFetched as arePaymentIntentInstrumentsFetchedSelector,
  arePaymentIntentInstrumentsLoading as arePaymentIntentInstrumentsLoadingSelector,
  createPaymentIntentInstrument,
  fetchPaymentIntentInstruments,
  getPaymentIntentInstruments,
  getPaymentIntentInstrumentsError,
  removePaymentIntentInstrument,
  resetPaymentIntentInstruments,
  type StoreState,
  updatePaymentIntentInstrument,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
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
  const store = useStore();

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
  const resetInstrumentsState = useAction(resetPaymentIntentInstruments);

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
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading =
      arePaymentIntentInstrumentsLoadingSelector(updatedState);
    const updatedIsFetched =
      arePaymentIntentInstrumentsFetchedSelector(updatedState);

    if (
      !updatedIsLoading &&
      !updatedIsFetched &&
      enableAutoFetch &&
      paymentIntentId
    ) {
      fetch();
    }
  }, [enableAutoFetch, fetch, fetchConfig, paymentIntentId, store]);

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
