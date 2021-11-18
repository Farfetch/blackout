import {
  POST_CHARGES_FAILURE,
  POST_CHARGES_REQUEST,
  POST_CHARGES_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PostChargesData
 * @property {object} chargeTransaction - Charge transaction data.
 */

/**
 * @callback PostChargesThunkFactory
 * @param {string} id - Numeric identifier of the checkout order.
 * @param {PostChargesData} data - Details for the charge.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an order charge.
 *
 * @function doPostCharges
 * @memberof module:checkout/actions
 *
 * @param {Function} postCharges - Post charges client.
 *
 * @returns {PostChargesThunkFactory} Thunk factory.
 */
export default postCharges => (id, data, config) => async dispatch => {
  dispatch({
    type: POST_CHARGES_REQUEST,
  });

  try {
    const result = await postCharges(id, data, config);

    dispatch({
      payload: result,
      type: POST_CHARGES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_CHARGES_FAILURE,
    });

    throw error;
  }
};
