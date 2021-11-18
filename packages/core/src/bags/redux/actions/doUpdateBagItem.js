import { getBagId } from '../selectors';
import { normalize } from 'normalizr';
import {
  UPDATE_BAG_ITEM_FAILURE,
  UPDATE_BAG_ITEM_REQUEST,
  UPDATE_BAG_ITEM_SUCCESS,
} from '../actionTypes';
import bagSchema from '../../../entities/schemas/bag';

/**
 * @callback UpdateBagItemThunkFactory
 * @param {number} bagItemId - Bag item id.
 * @param {object} data - Data to update the bag item.
 * @param {object} [config] - Custom configurations to send to the client
 *                          instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates bag item with given data.
 *
 * @function doUpdateBagItem
 * @memberof module:bags/actions
 *
 * @param {Function} patchBagItem - Patch bag item client.
 *
 * @returns {UpdateBagItemThunkFactory} Thunk factory.
 */
export default patchBagItem =>
  (bagItemId, data, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    const state = getState();
    const bagId = getBagId(state);

    dispatch({
      payload: { bagItemId },
      type: UPDATE_BAG_ITEM_REQUEST,
    });

    try {
      const result = await patchBagItem(bagId, bagItemId, data, config);
      const { productImgQueryParam } = getOptions(getState);
      dispatch({
        payload: {
          ...normalize(
            {
              // Send this to the entity's `adaptProductImages`
              productImgQueryParam,
              ...result,
            },
            bagSchema,
          ),
          bagItemId,
        },
        type: UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...data,
          bagItemId,
          bagId,
        },
      });
    } catch (error) {
      dispatch({
        payload: { error, bagItemId },
        type: UPDATE_BAG_ITEM_FAILURE,
      });

      throw error;
    }
  };
