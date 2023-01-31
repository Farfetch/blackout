import {
  GET_BAG_FAILURE,
  GET_BAG_REQUEST,
  GET_BAG_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import bagSchema from '../../../entities/schemas/bag';

/**
 * @callback GetBagThunkFactory
 * @param {number} bagId - Bag id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load bag with given id.
 *
 * @function doGetBag
 * @memberof module:bags/actions
 *
 * @param {Function} getBag - Get bag client.
 *
 * @returns {GetBagThunkFactory} Thunk factory.
 */
export default getBag =>
  (bagId, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    dispatch({
      type: GET_BAG_REQUEST,
    });

    try {
      const result = await getBag(bagId, config);
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
        type: GET_BAG_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_BAG_FAILURE,
      });

      throw error;
    }
  };
