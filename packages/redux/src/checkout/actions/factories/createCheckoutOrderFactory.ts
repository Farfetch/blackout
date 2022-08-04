import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderResponse,
  PostCheckoutOrder,
  PostCheckoutOrderDataWithBag,
  PostCheckoutOrderDataWithItems,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating the checkout order. Note: The checkout entity
 * state will contains the orderStatus which is used to keep track of the latest
 * error when creating a new checkout order.
 *
 * @param postCheckoutOrder - Post checkout client.
 *
 * @returns Thunk factory.
 */
const createCheckoutOrderFactory =
  (postCheckoutOrder: PostCheckoutOrder) =>
  (
    data: PostCheckoutOrderDataWithItems | PostCheckoutOrderDataWithBag,
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_CHECKOUT_ORDER_REQUEST,
      });

      const result = await postCheckoutOrder(data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_CHECKOUT_ORDER_FAILURE,
      });

      throw error;
    }
  };

export default createCheckoutOrderFactory;