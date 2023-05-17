import {
  createCheckoutOrderCharge,
  fetchCheckoutOrderCharge,
  getCheckoutOrderChargeError,
  getCheckoutOrderChargeResult,
  isCheckoutOrderChargeFetched,
  isCheckoutOrderChargeLoading,
  resetCheckoutOrderChargeState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type {
  CheckoutOrder,
  CheckoutOrderCharge,
  Config,
  PostCheckoutOrderChargeData,
} from '@farfetch/blackout-client';
import type { UseCheckoutOrderChargeOptions } from './types/index.js';

function useCheckoutOrderCharge(
  checkoutOrderId?: CheckoutOrder['id'],
  chargeId?: CheckoutOrderCharge['id'],
  options: UseCheckoutOrderChargeOptions = {},
) {
  const chargeIdHookParameter = chargeId;
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector(isCheckoutOrderChargeLoading);
  const error = useSelector(getCheckoutOrderChargeError);
  const chargeResult = useSelector(getCheckoutOrderChargeResult);
  const isFetched = useSelector(isCheckoutOrderChargeFetched);
  const fetchChargeAction = useAction(fetchCheckoutOrderCharge);
  const reset = useAction(resetCheckoutOrderChargeState);
  const createChargeAction = useAction(createCheckoutOrderCharge);
  const implicitChargeId = chargeIdHookParameter || chargeResult?.id;

  const fetch = useCallback(
    (config: Config | undefined = fetchConfig) => {
      if (!checkoutOrderId) {
        return Promise.reject(new Error('Missing checkout order id.'));
      }

      if (!implicitChargeId) {
        return Promise.reject(new Error('Missing charge id'));
      }

      return fetchChargeAction(checkoutOrderId, implicitChargeId, config);
    },
    [checkoutOrderId, fetchChargeAction, fetchConfig, implicitChargeId],
  );

  const create = useCallback(
    (data: PostCheckoutOrderChargeData, config?: Config) => {
      if (!checkoutOrderId) {
        return Promise.reject(new Error('Missing checkout order id.'));
      }

      return createChargeAction(checkoutOrderId, data, config);
    },
    [checkoutOrderId, createChargeAction],
  );

  // If chargeId parameter was passed and it is different
  // than the current chargeId in the store, reset all charge data
  // in redux.
  if (
    chargeIdHookParameter &&
    chargeResult?.id &&
    chargeResult?.id !== chargeIdHookParameter
  ) {
    reset();
  }

  useEffect(() => {
    if (
      !isLoading &&
      !isFetched &&
      enableAutoFetch &&
      checkoutOrderId &&
      chargeId
    ) {
      fetch();
    }
  }, [
    chargeId,
    checkoutOrderId,
    enableAutoFetch,
    fetch,
    fetchConfig,
    isFetched,
    isLoading,
  ]);

  return {
    actions: {
      fetch,
      create,
      reset,
    },
    data: chargeResult,
    isLoading,
    isFetched,
    error,
  };
}

export default useCheckoutOrderCharge;
