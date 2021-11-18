import { normalize } from 'normalizr';
import {
  SET_PROMOCODE_FAILURE,
  SET_PROMOCODE_REQUEST,
  SET_PROMOCODE_SUCCESS,
} from '../actionTypes';
import checkoutSchema from '../../../entities/schemas/checkout';

/**
 * @typedef {object} SetPromocodeData
 * @property {string} promocode - Promocode.
 */

/**
 * @callback SetPromocodeThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {SetPromocodeData} data - Data to add a promocode.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for adding promo code information.
 *
 * @function doSetPromocode
 * @memberof module:checkout/actions
 *
 * @param {Function} putPromocode - Put promocode client.
 *
 * @returns {SetPromocodeThunkFactory} Thunk factory.
 */
export default putPromocode => (id, data, config) => async dispatch => {
  dispatch({
    type: SET_PROMOCODE_REQUEST,
  });

  try {
    const result = await putPromocode(id, data, config);

    dispatch({
      payload: normalize(result, checkoutSchema),
      type: SET_PROMOCODE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: SET_PROMOCODE_FAILURE,
    });

    throw error;
  }
};
