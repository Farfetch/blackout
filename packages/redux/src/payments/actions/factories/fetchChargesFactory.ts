import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type {
  Charge,
  GetCharges,
  Intent,
} from '@farfetch/blackout-client/payments/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchChargesAction } from '../../types';

/**
 * @param intentId - Id of the payment intent.
 * @param chargeId - Id of the intent charge.
 * @param config   - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Gets the payment intent charges.
 *
 * @param getCharges - Get charges client.
 *
 * @returns Thunk factory.
 */
const fetchChargesFactory =
  (getCharges: GetCharges) =>
  (intentId: Intent['id'], chargeId: string, config?: Config) =>
  async (dispatch: Dispatch<FetchChargesAction>): Promise<Charge> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHARGES_REQUEST,
      });

      const result = await getCharges(intentId, chargeId, config);

      dispatch({
        payload: result,
        meta: { chargeId },
        type: actionTypes.FETCH_CHARGES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_CHARGES_FAILURE,
      });

      throw error;
    }
  };

export default fetchChargesFactory;
