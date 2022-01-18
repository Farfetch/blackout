import {
  FETCH_ORDER_DETAILS_FAILURE,
  FETCH_ORDER_DETAILS_REQUEST,
  FETCH_ORDER_DETAILS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import orderItem from '../../../entities/schemas/orderItem';
import trim from 'lodash/trim';

/**
 * @callback FetchOrderDetailsThunkFactory
 * @param {string} orderId - The order id to get details from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetches order details.
 *
 * @function fetchOrderDetails
 * @memberof module:orders/actions
 *
 * @param {Function} getOrderDetails - Get order details client.
 *
 * @returns {FetchOrderDetailsThunkFactory} Thunk factory.
 */
export default getOrderDetails =>
  (orderId, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    dispatch({
      meta: { orderId },
      type: FETCH_ORDER_DETAILS_REQUEST,
    });

    try {
      const result = await getOrderDetails(orderId, config);
      const { productImgQueryParam } = getOptions(getState);
      // This is needed since the Farfetch Checkout service is merging
      // both Address Line 2 and Address Line 3 not checking correctly if the
      // second is empty, when the user fills the third address line but not
      // the second it adds a space when merging the values and returns it
      // in the second line.
      // This only occurs in the order details not in the address book.
      const normalizedAddressResult = {
        ...result,
        billingAddress: {
          ...result.billingAddress,
          addressLine1: trim(result.billingAddress.addressLine1),
          addressLine2: trim(result.billingAddress.addressLine2),
        },
        shippingAddress: {
          ...result.shippingAddress,
          addressLine1: trim(result.shippingAddress.addressLine1),
          addressLine2: trim(result.shippingAddress.addressLine2),
        },
      };

      dispatch({
        meta: { orderId },
        payload: normalize(
          {
            // Send this to the entity's `adaptProductImages`
            productImgQueryParam,
            ...normalizedAddressResult,
          },
          {
            items: [orderItem],
          },
        ),
        type: FETCH_ORDER_DETAILS_SUCCESS,
        guest: false,
      });

      return normalizedAddressResult;
    } catch (error) {
      dispatch({
        meta: { orderId },
        payload: { error },
        type: FETCH_ORDER_DETAILS_FAILURE,
      });

      throw error;
    }
  };
