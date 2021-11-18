import {
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import orderItem from '../../../entities/schemas/orderItem';
import trim from 'lodash/trim';

/**
 * @callback GetOrderDetailsThunkFactory
 * @param {string} orderId - The order id to get details from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get order details.
 *
 * @function doGetOrderDetails
 * @memberof module:orders/actions
 *
 * @param {Function} getOrderDetails - Get order details client.
 *
 * @returns {GetOrderDetailsThunkFactory} Thunk factory.
 */
export default getOrderDetails =>
  (orderId, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    dispatch({
      meta: { orderId },
      type: GET_ORDER_DETAILS_REQUEST,
    });

    try {
      const result = await getOrderDetails(orderId, config);
      const { productImgQueryParam } = getOptions(getState);
      // This is a workaround to prevent breaking changes. It will be reviewed in core v2.
      // Its purpose is to correctly place the `orderItems` property under the merchantOrderCode,
      // i.e., orders -> ORDER_ID -> byMerchant -> MERCHANT_ID -> MERCHANT_ORDER_CODE -> orderItems,
      // instead of under the default merchantId, i.e. orders -> ORDER_ID -> byMerchant -> MERCHANT_ID -> orderItems.
      // For this, we check the store to see if the item `merchantOrderCode` property is present.
      // If it does, it means orders are split by merchantOrderCode.
      // Checking it for the first item is enough. If that one is available, all others will be.
      const firstOrderItem = result?.items[0];

      // Checks if the store is organized by the merchantOrderCode. If for example the checkourOrderId is
      // present, then it is not split by merchantOrderCode.
      const isSplitByMerchantOrderCode =
        !getState()?.entities?.orders[orderId]?.byMerchant[
          firstOrderItem.merchantId
        ].checkoutOrderId;

      /* This is needed since the Checkout service is merging
        both Address Line 2 and Address Line 3 not checking correctly if the
        second is empty, when the user fills the third address line but not
        the second it adds a space when merging the values and returns it
        in the second line.
        This only occurs in the order details not in the address book. */
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
        meta: { orderId, isSplitByMerchantOrderCode },
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
        type: GET_ORDER_DETAILS_SUCCESS,
        guest: false,
      });
    } catch (error) {
      dispatch({
        meta: { orderId },
        payload: { error },
        type: GET_ORDER_DETAILS_FAILURE,
      });

      throw error;
    }
  };
