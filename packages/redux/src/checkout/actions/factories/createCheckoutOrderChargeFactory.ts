import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrderCharge,
  Config,
  PostCheckoutOrderCharge,
  PostCheckoutOrderChargeData,
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
  (id: number, data: PostCheckoutOrderChargeData, config?: Config) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderCharge> => {
    try {
      dispatch({
        type: actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_REQUEST,
      });

      const result = await postCheckoutOrderCharges(id, data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_FAILURE,
      });

      throw error;
    }
  };

export default createCheckoutOrderChargeFactory;
