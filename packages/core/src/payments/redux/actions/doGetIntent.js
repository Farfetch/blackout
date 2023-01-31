// import { normalize } from 'normalizr';
import {
  GET_INTENT_FAILURE,
  GET_INTENT_REQUEST,
  GET_INTENT_SUCCESS,
} from '../actionTypes';
// import instrumentSchema from '../../../entities/schemas/instrument';

/**
 * @callback GetIntentThunkFactory
 * @param {string} intentId - Id of the payment Intent.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the payment intent details.
 *
 * @function doGetIntent
 * @memberof module:payments/actions
 *
 * @param {Function} getIntent - Get intent client.
 *
 * @returns {GetIntentThunkFactory} Thunk factory.
 */
export default getIntent => (intentId, config) => async dispatch => {
  dispatch({
    type: GET_INTENT_REQUEST,
  });

  try {
    const result = await getIntent(intentId, config);

    dispatch({
      payload: result,
      type: GET_INTENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_INTENT_FAILURE,
    });

    throw error;
  }
};
