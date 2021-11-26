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
 * @callback FetchIntentThunkFactory
 * @param {string} intentId - Id of the payment Intent.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the payment intent details.
 *
 * @function fetchIntentFactory
 * @memberof module:payments/actions/factories
 *
 * @param {Function} getIntent - Get intent client.
 *
 * @returns {FetchIntentThunkFactory} Thunk factory.
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
