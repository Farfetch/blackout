import { normalize } from 'normalizr';
import {
  POST_GUEST_ORDER_DETAILS_FAILURE,
  POST_GUEST_ORDER_DETAILS_REQUEST,
  POST_GUEST_ORDER_DETAILS_SUCCESS,
} from '../actionTypes';
import orderItem from '../../../entities/schemas/orderItem';

/**
 * @typedef {object} Data
 *
 * @property {string} guestUserEmail - Guest user email.
 */

/**
 * @callback PostOrderDetailsGuestUserThunkFactory
 * @param {string} orderId - The order id to get details from.
 * @param {Data} data - Guest orders request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Retrieve order details for a guest user.
 *
 * @function doPostOrderDetailsGuestUser
 * @memberof module:orders/actions
 *
 * @param {Function} postGuestOrderDetails - Post guest order details client.
 *
 * @returns {PostOrderDetailsGuestUserThunkFactory} Thunk factory.
 */
export default postGuestOrderDetails =>
  (orderId, data, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    dispatch({
      meta: { orderId },
      type: POST_GUEST_ORDER_DETAILS_REQUEST,
    });

    try {
      const result = await postGuestOrderDetails(orderId, data, config);
      const { productImgQueryParam } = getOptions(getState);

      dispatch({
        meta: { orderId },
        payload: normalize(
          {
            // Send this to the entity's `adaptProductImages`
            productImgQueryParam,
            ...result,
          },
          {
            items: [orderItem],
          },
        ),
        type: POST_GUEST_ORDER_DETAILS_SUCCESS,
        guest: true,
      });
    } catch (error) {
      dispatch({
        meta: { orderId },
        payload: { error },
        type: POST_GUEST_ORDER_DETAILS_FAILURE,
      });

      throw error;
    }
  };
