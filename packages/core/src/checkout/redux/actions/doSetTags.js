import { normalize } from 'normalizr';
import {
  SET_TAGS_FAILURE,
  SET_TAGS_REQUEST,
  SET_TAGS_SUCCESS,
} from '../actionTypes';
import checkoutSchema from '../../../entities/schemas/checkout';

/**
 * @callback SetTagsThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {Array} data - Array of strings representing the tags you want to add.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for adding tags information.
 *
 * @function doSetTags
 * @memberof module:checkout/actions
 *
 * @param {Function} putTags - Put tags client.
 *
 * @returns {SetTagsThunkFactory} Thunk factory.
 */
export default putTags => (id, data, config) => async dispatch => {
  dispatch({
    type: SET_TAGS_REQUEST,
  });

  try {
    const result = await putTags(id, data, config);

    dispatch({
      payload: normalize(result, checkoutSchema),
      type: SET_TAGS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: SET_TAGS_FAILURE,
    });

    throw error;
  }
};
