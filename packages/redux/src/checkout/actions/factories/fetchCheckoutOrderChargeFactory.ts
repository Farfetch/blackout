import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrderCharge,
  Config,
  GetCheckoutOrderCharge,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchCheckoutOrderChargeAction } from '../../types';

/**
 * @param id       - Numeric identifier of the checkout order.
 * @param chargeId - Alphanumeric guid of the charge.
 * @param config   - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the order charge.
 *
 * @param getCheckoutOrderCharge - Get charges client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderChargeFactory =
  (getCheckoutOrderCharge: GetCheckoutOrderCharge) =>
  (id: string, chargeId: string, config?: Config) =>
  async (
    dispatch: Dispatch<FetchCheckoutOrderChargeAction>,
  ): Promise<CheckoutOrderCharge> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_REQUEST,
      });

      const result = await getCheckoutOrderCharge(id, chargeId, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_FAILURE,
      });

      throw error;
    }
  };

export default fetchCheckoutOrderChargeFactory;
