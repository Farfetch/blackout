import { getBagId } from '../selectors';
import {
  SET_BAG_PROMOCODES_FAILURE,
  SET_BAG_PROMOCODES_REQUEST,
  SET_BAG_PROMOCODES_SUCCESS,
} from '../actionTypes';

/**
 * @callback SetBagPromocodesThunkFactory
 * @param {number} bagId - Bag id.
 * @param {object} data - Extra data usefull for action meta.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Set promocodes to the current bag.
 *
 * @function doSetBagPromocodes
 * @memberof module:bags/actions
 *
 * @param {Function} setBagPromocodes - Set promocodes in in bag client.
 *
 * @returns {SetBagPromocodesThunkFactory} Thunk factory.
 */
export default setBagPromocodes =>
  (data, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const bagId = getBagId(state);

    dispatch({
      type: SET_BAG_PROMOCODES_REQUEST,
    });

    try {
      const { promoCodesInformation } = await setBagPromocodes(
        bagId,
        data,
        config,
      );

      dispatch({
        payload: {
          result: bagId,
          entities: {
            bagPromocodesInformation: { [bagId]: promoCodesInformation },
          },
        },
        type: SET_BAG_PROMOCODES_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: SET_BAG_PROMOCODES_FAILURE,
      });

      throw error;
    }
  };
