import {
  GET_CHARGES_FAILURE,
  GET_CHARGES_REQUEST,
  GET_CHARGES_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetChargesThunkFactory
 * @param {string} intentId - Id of the payment intent.
 * @param {string} chargeId - Id of the intent charge.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the payment intent charges.
 *
 * @function doGetCharges
 * @memberof module:payments/actions
 *
 * @param {Function} getCharges - Get charges client.
 *
 * @returns {GetChargesThunkFactory} Thunk factory.
 */
export default getCharges => (intentId, chargeId, config) => async dispatch => {
  dispatch({
    type: GET_CHARGES_REQUEST,
  });

  try {
    const result = await getCharges(intentId, chargeId, config);

    dispatch({
      payload: result,
      meta: { chargeId },
      type: GET_CHARGES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_CHARGES_FAILURE,
    });

    throw error;
  }
};
