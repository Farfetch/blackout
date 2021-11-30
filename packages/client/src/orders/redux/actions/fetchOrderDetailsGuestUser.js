import {
  FETCH_ORDER_DETAILS_FAILURE,
  FETCH_ORDER_DETAILS_REQUEST,
  FETCH_ORDER_DETAILS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import orderItem from '../../../entities/schemas/orderItem';

/**
 * @callback FetchOrderDetailsGuestUserThunkFactory
 * @param {string} orderId - The order id to get details from.
 * @param {string} guestUserEmail - The guest user e-mail to get details from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetches order details for a guest user.
 *
 * @function fetchOrderDetailsGuestUser
 * @memberof module:orders/actions
 *
 * @param {Function} getGuestOrderDetails - Get guest order details client.
 *
 * @returns {FetchOrderDetailsGuestUserThunkFactory} Thunk factory.
 */
export default getGuestOrderDetails =>
  (orderId, guestUserEmail, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    dispatch({
      meta: { orderId },
      type: FETCH_ORDER_DETAILS_REQUEST,
    });

    try {
      const result = await getGuestOrderDetails(
        orderId,
        guestUserEmail,
        config,
      );
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
        type: FETCH_ORDER_DETAILS_SUCCESS,
        guest: true,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { orderId },
        payload: { error },
        type: FETCH_ORDER_DETAILS_FAILURE,
      });

      throw error;
    }
  };
