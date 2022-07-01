import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrderCharge,
  Config,
  PostCheckoutOrderCharges,
  PostCheckoutOrderChargesData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param id     - Numeric identifier of the checkout order.
 * @param data   - Details for the charge.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an intent charge. To be used by pay-by-link 1.5
 * only.
 *
 * @param postCheckoutOrderCharges - Post checkout order charges client.
 *
 * @returns Thunk factory.
 */
const createCheckoutOrderChargeFactory =
  (postCheckoutOrderCharges: PostCheckoutOrderCharges) =>
  (id: number, data: PostCheckoutOrderChargesData, config?: Config) =>
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
