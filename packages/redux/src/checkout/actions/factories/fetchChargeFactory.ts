import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderCharge,
  GetCheckoutOrderChargeResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
const fetchChargeFactory =
  (getCheckoutOrderCharge: GetCheckoutOrderCharge) =>
  (id: string, chargeId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderChargeResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHARGES_REQUEST,
      });

      const result = await getCheckoutOrderCharge(id, chargeId, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_CHARGES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CHARGES_FAILURE,
      });

      throw error;
    }
  };

export default fetchChargeFactory;
