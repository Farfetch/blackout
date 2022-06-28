import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type {
  Config,
  GetCheckoutOrderChargeResponse,
  PostCheckoutOrderCharges,
  PostCheckoutOrderChargesData,
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
 * @param postCharges - Post charges client.
 *
 * @returns Thunk factory.
 */
const chargeFactory =
  (postCheckoutOrderCharges: PostCheckoutOrderCharges) =>
  (id: number, data: PostCheckoutOrderChargesData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderChargeResponse> => {
    try {
      dispatch({
        type: actionTypes.CHARGE_REQUEST,
      });

      const result = await postCheckoutOrderCharges(id, data, config);

      dispatch({
        payload: result,
        type: actionTypes.CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.CHARGE_FAILURE,
      });

      throw error;
    }
  };

export default chargeFactory;
