import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderResponse,
  PostCheckoutOrder,
  PostCheckoutOrderData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';

/**
 * @param data   - Data to create the checkout.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating the checkout order. Note: The checkout entity
 * state will contains the orderStatus which is used to keep track of the latest
 * error when creating a new checkout order.
 *
 * @param postCheckoutOrder - Post checkout client.
 *
 * @returns Thunk factory.
 */
const createCheckoutFactory =
  (postCheckoutOrder: PostCheckoutOrder) =>
  (data: PostCheckoutOrderData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_CHECKOUT_REQUEST,
      });

      const result = await postCheckoutOrder(data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: actionTypes.CREATE_CHECKOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };

export default createCheckoutFactory;
