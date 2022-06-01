import {
  CHARGE_FAILURE,
  CHARGE_REQUEST,
  CHARGE_SUCCESS,
} from '../../actionTypes';
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
    dispatch({
      type: CHARGE_REQUEST,
    });

    try {
      const result = await postCharges(id, data, config);

      dispatch({
        payload: result,
        type: CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CHARGE_FAILURE,
      });

      throw error;
    }
  };

export default chargeFactory;
