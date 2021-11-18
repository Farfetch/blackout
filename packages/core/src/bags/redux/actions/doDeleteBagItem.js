import {
  DELETE_BAG_ITEM_FAILURE,
  DELETE_BAG_ITEM_REQUEST,
  DELETE_BAG_ITEM_SUCCESS,
} from '../actionTypes';
import { getBagId } from '../selectors';
import { normalize } from 'normalizr';
import bagSchema from '../../../entities/schemas/bag';

/**
 * @callback DeleteBagItemThunkFactory
 * @param {number} bagItemId - Bag item id.
 * @param {object} data - Extra data usefull for action meta.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Delete bag item with given id.
 *
 * @function doDeleteBagItem
 * @memberof module:bags/actions
 *
 * @param {Function} deleteBagItem - Delete bag item client.
 *
 * @returns {DeleteBagItemThunkFactory} Thunk factory.
 */
export default deleteBagItem =>
  (bagItemId, data, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const bagId = getBagId(state);

    dispatch({
      payload: { bagItemId },
      type: DELETE_BAG_ITEM_REQUEST,
    });

    try {
      const result = await deleteBagItem(bagId, bagItemId, config);

      dispatch({
        payload: { ...normalize(result, bagSchema), bagItemId },
        type: DELETE_BAG_ITEM_SUCCESS,
        meta: {
          ...data,
          bagId,
          bagItemId,
        },
      });
    } catch (error) {
      dispatch({
        payload: { error, bagItemId },
        type: DELETE_BAG_ITEM_FAILURE,
      });

      throw error;
    }
  };
