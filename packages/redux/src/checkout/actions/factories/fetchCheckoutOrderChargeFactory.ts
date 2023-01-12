import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrder,
  CheckoutOrderCharge,
  Config,
  GetCheckoutOrderCharge,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchCheckoutOrderChargeAction } from '../../types';

/**
 * Method responsible for getting the order charge.
 *
 * @param getCheckoutOrderCharge - Get charges client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderChargeFactory =
  (getCheckoutOrderCharge: GetCheckoutOrderCharge) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    chargeId: CheckoutOrderCharge['id'],
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchCheckoutOrderChargeAction>,
  ): Promise<CheckoutOrderCharge> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_REQUEST,
      });

      const result = await getCheckoutOrderCharge(
        checkoutOrderId,
        chargeId,
        config,
      );

      dispatch({
        payload: result,
        type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderChargeFactory;
