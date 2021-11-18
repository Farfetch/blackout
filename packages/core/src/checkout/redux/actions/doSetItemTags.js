import { normalize } from 'normalizr';
import {
  SET_ITEM_TAGS_FAILURE,
  SET_ITEM_TAGS_REQUEST,
  SET_ITEM_TAGS_SUCCESS,
} from '../actionTypes';
import checkoutSchema from '../../../entities/schemas/checkout';

/**
 * @callback SetItemTagsThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {string} itemId - Universal identifier of the Item.
 * @param {Array} data - Array of strings representing the tags that
 * you want to persist and/or add.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for updating the checkout item tags.
 *
 * @function doSetItemTags
 * @memberof module:checkout/actions
 *
 * @param {Function} putItemTags - Put item tags client.
 *
 * @returns {SetItemTagsThunkFactory} Thunk factory.
 */
export default putItemTags => (id, itemId, data, config) => async dispatch => {
  dispatch({
    type: SET_ITEM_TAGS_REQUEST,
  });

  try {
    const result = await putItemTags(id, itemId, data, config);

    dispatch({
      payload: normalize(result, checkoutSchema),
      type: SET_ITEM_TAGS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: SET_ITEM_TAGS_FAILURE,
    });

    throw error;
  }
};
