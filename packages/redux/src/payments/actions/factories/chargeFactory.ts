import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { ChargesAction } from '../../types';
import type { Dispatch } from 'redux';
import type {
  Intent,
  PostCharges,
  PostChargesData,
  PostChargesResponse,
} from '@farfetch/blackout-client/payments/types';

/**
 * @param id     - Numeric identifier of the payment intent.
 * @param data   - Details for the charge.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an intent charge.
 *
 * @param postCharges - Post charges client.
 *
 * @returns Thunk factory.
 */

const postChargesFactory =
  (postCharges: PostCharges) =>
  (id: Intent['id'], data: PostChargesData, config?: Config) =>
  async (dispatch: Dispatch<ChargesAction>): Promise<PostChargesResponse> => {
    try {
      dispatch({
        type: actionTypes.CHARGE_REQUEST,
      });

      const result = await postCharges(id, data, config);
      // The chargeId is only accessible through the 'location' header.
      const chargeId = result?.headers['location']?.split('charges/')[1] || '';

      dispatch({
        payload: result.data,
        meta: { chargeId },
        type: actionTypes.CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CHARGE_FAILURE,
      });

      throw error;
    }
  };

export default postChargesFactory;
