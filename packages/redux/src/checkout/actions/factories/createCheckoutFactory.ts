import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutResponse,
  PostCheckout,
  PostCheckoutData,
} from '@farfetch/blackout-client/checkout/types';

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
 * @param postCheckout - Post checkout client.
 *
 * @returns Thunk factory.
 */
const createCheckoutFactory =
  (postCheckout: PostCheckout) =>
  (data: PostCheckoutData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_CHECKOUT_REQUEST,
      });

      const result = await postCheckout(data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: actionTypes.CREATE_CHECKOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.CREATE_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };

export default createCheckoutFactory;
