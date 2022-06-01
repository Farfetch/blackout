import {
  FETCH_CHECKOUT_FAILURE,
  FETCH_CHECKOUT_REQUEST,
  FETCH_CHECKOUT_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckout,
  GetCheckoutQuery,
  GetCheckoutResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @param id     - Universal identifier of the Checkout.
 * @param query  - Query params to retrieve the checkout.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the checkout.
 *
 * @param getCheckout - Get checkout client.
 *
 * @returns Thunk factory.
 */
export default (getCheckout: GetCheckout) =>
  (id: number, query: GetCheckoutQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    dispatch({
      type: FETCH_CHECKOUT_REQUEST,
    });

    try {
      const result = await getCheckout(id, query, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: FETCH_CHECKOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };
