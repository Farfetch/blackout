import {
  GET_CHARGES_FAILURE,
  GET_CHARGES_REQUEST,
  GET_CHARGES_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetChargesThunkFactory
 * @param {string} id - Numeric identifier of the checkout order.
 * @param {string} chargeId - Alphanumeric guid of the charge.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the order charge.
 *
 * @function doGetCharges
 * @memberof module:checkout/actions
 *
 * @param {Function} getCharges - Get charges client.
 *
 * @returns {GetChargesThunkFactory} Thunk factory.
 */
export default getCharges => (id, chargeId, config) => async dispatch => {
  dispatch({
    type: GET_CHARGES_REQUEST,
  });

  try {
    const result = await getCharges(id, chargeId, config);

    dispatch({
      payload: result,
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
