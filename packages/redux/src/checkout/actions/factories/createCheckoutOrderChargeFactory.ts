import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type CheckoutOrderCharge,
  type Config,
  type PostCheckoutOrderCharge,
  type PostCheckoutOrderChargeData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an intent charge. To be used by pay-by-link 1.5
 * only.
 *
 * @param postCheckoutOrderCharge - Post checkout order charge client.
 *
 * @returns Thunk factory.
 */
const createCheckoutOrderChargeFactory =
  (postCheckoutOrderCharges: PostCheckoutOrderCharge) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    data: PostCheckoutOrderChargeData,
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderCharge> => {
    try {
      dispatch({
        type: actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_REQUEST,
      });

      const result = await postCheckoutOrderCharges(
        checkoutOrderId,
        data,
        config,
      );

      dispatch({
        payload: result,
        type: actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createCheckoutOrderChargeFactory;
