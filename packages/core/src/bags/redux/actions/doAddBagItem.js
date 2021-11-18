import {
  ADD_ITEM_TO_BAG_FAILURE,
  ADD_ITEM_TO_BAG_REQUEST,
  ADD_ITEM_TO_BAG_SUCCESS,
} from '../actionTypes';
import { getBagId } from '../selectors';
import { normalize } from 'normalizr';
import bagSchema from '../../../entities/schemas/bag';

/**
 * @callback AddBagItemThunkFactory
 * @param {object} data - Item data used to add it to bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Add item with given data to the bag.
 *
 * @function doAddBagItem
 * @memberof module:bags/actions
 *
 * @param {Function} postBagItem - Post bag item client.
 *
 * @returns {AddBagItemThunkFactory} Thunk factory.
 */
export default postBagItem =>
  (data, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    const state = getState();
    const bagId = getBagId(state);

    // Do not add product if there's no bag set yet
    if (!bagId) {
      throw new Error('No bag id is set');
    }

    dispatch({
      type: ADD_ITEM_TO_BAG_REQUEST,
    });

    try {
      const result = await postBagItem(bagId, data, config);
      const { productImgQueryParam } = getOptions(getState);

      dispatch({
        payload: normalize(
          {
            // Send this to the entity's `adaptProductImages`
            productImgQueryParam,
            ...result,
          },
          bagSchema,
        ),
        type: ADD_ITEM_TO_BAG_SUCCESS,
        meta: {
          ...data,
          bagId,
        },
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: ADD_ITEM_TO_BAG_FAILURE,
      });

      throw error;
    }
  };
