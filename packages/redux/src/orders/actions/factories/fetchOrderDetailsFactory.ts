import * as actionTypes from '../../actionTypes';
import { adaptDate } from '../../../helpers/adapters';
import {
  Config,
  GetOrderDetails,
  Order,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import orderItem from '../../../entities/schemas/orderItem';
import trim from 'lodash/trim';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * @param orderId - The order id to get details from.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetches order details.
 *
 * @param getOrderDetails - Get order details client.
 *
 * @returns Thunk factory.
 */
const fetchOrderDetailsFactory =
  (getOrderDetails: GetOrderDetails) =>
  (orderId: string, config?: Config) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Order> => {
    try {
      dispatch({
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_DETAILS_REQUEST,
      });

      const result = await getOrderDetails(orderId, config);
      const { productImgQueryParam } = getOptions(getState);
      // This is needed since the Farfetch Checkout service is merging
      // both Address Line 2 and Address Line 3 not checking correctly if the
      // second is empty, when the user fills the third address line but not
      // the second it adds a space when merging the values and returns it
      // in the second line.
      // This only occurs in the order details not in the address book.
      const normalizedResult: Order = {
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
        meta: { orderId, guest: false },
        payload: normalize(
          {
            // Send this to the entity's `adaptProductImages`
            productImgQueryParam,
            ...normalizedResult,
            createdDate: adaptDate(result.createdDate),
            updatedDate: adaptDate(result.updatedDate),
          },
          {
            items: [orderItem],
          },
        ),
        type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
      });

      return normalizedResult;
    } catch (error) {
      dispatch({
        meta: { orderId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ORDER_DETAILS_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderDetailsFactory;
