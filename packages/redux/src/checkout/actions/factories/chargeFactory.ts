import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetChargesResponse,
  PostCharges,
  PostChargesData,
} from '@farfetch/blackout-client/checkout/types';

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
  (postCharges: PostCharges) =>
  (id: string, data: PostChargesData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetChargesResponse> => {
    try {
      dispatch({
        type: actionTypes.CHARGE_REQUEST,
      });

      const result = await postCharges(id, data, config);

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
