import {
  FETCH_INTENT_FAILURE,
  FETCH_INTENT_REQUEST,
  FETCH_INTENT_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchIntentAction } from '../../types';
import type {
  GetIntent,
  Intent,
} from '@farfetch/blackout-client/payments/types';

/**
 * @param intentId - Id of the payment Intent.
 * @param config   - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Gets the payment intent details.
 *
 * @param getIntent - Get intent client.
 *
 * @returns Thunk factory.
 */
const fetchIntentFactory =
  (getIntent: GetIntent) =>
  (intentId: Intent['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchIntentAction>): Promise<Intent> => {
    dispatch({
      type: FETCH_INTENT_REQUEST,
    });

    try {
      const result = await getIntent(intentId, config);

      dispatch({
        payload: result,
        type: FETCH_INTENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_INTENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchIntentFactory;
