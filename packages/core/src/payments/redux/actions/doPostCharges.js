import {
  POST_CHARGES_FAILURE,
  POST_CHARGES_REQUEST,
  POST_CHARGES_SUCCESS,
} from '../actionTypes';
import get from 'lodash/get';

/**
 * @typedef {object} PostChargesData
 * @property {string} returnUrl - After the customer completes the payment,
 * ask the payment service to redirect the browser of the customer to this URL.
 * @property {string} cancelUrl - If the customer cancels the payment,
 * ask the payment service to redirect the browser of the customer to this URL.
 */

/**
 * @callback PostChargesThunkFactory
 * @param {string} id - Numeric identifier of the payment intent.
 * @param {PostChargesData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an intent charge.
 *
 * @function doPostCharges
 * @memberof module:payments/actions
 *
 * @param {Function} postCharges - Numeric identifier of the payment intent.
 *
 * @returns {PostChargesThunkFactory} Thunk factory.
 */
export default postCharges => (id, data, config) => async dispatch => {
  dispatch({
    type: POST_CHARGES_REQUEST,
  });

  try {
    const result = await postCharges(id, data, config);
    // The chargeId is only accessible through the 'location' header.
    const chargeId = get(result.headers, 'location').split('charges/')[1];

    dispatch({
      payload: result.data,
      meta: { chargeId },
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
