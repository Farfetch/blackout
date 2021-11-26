import {
  FETCH_CHECKOUT_DETAILS_FAILURE,
  FETCH_CHECKOUT_DETAILS_REQUEST,
  FETCH_CHECKOUT_DETAILS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import checkoutDetailsSchema from '../../../entities/schemas/checkoutDetails';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutDetails,
  GetCheckoutDetailsResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @callback FetchCheckoutDetailsThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {object} [query] - Query params to retrieve the checkout details.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the checkout details.
 * These are used for the order confirmation.
 *
 * @function fetchCheckoutDetailsFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} getCheckoutDetails - Get checkout details client.
 *
 * @returns {FetchCheckoutDetailsThunkFactory} Thunk factory.
 */
export default (getCheckoutDetails: GetCheckoutDetails) =>
  (id: number, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutDetailsResponse> => {
    dispatch({
      type: FETCH_CHECKOUT_DETAILS_REQUEST,
    });

    try {
      const result = await getCheckoutDetails(id, config);

      dispatch({
        meta: { id },
        payload: normalize(result, checkoutDetailsSchema),
        type: FETCH_CHECKOUT_DETAILS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_CHECKOUT_DETAILS_FAILURE,
      });

      throw error;
    }
  };
