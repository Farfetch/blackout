import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderDetails,
  GetCheckoutOrderDetailsResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutDetailsSchema from '../../../entities/schemas/checkoutDetails';
import type { Dispatch } from 'redux';

/**
 * @param id     - Universal identifier of the Checkout.
 * @param query  - Query params to retrieve the checkout details.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the checkout details. These are used for the
 * order confirmation.
 *
 * @param getCheckoutOrderDetails - Get checkout details client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutDetailsFactory =
  (getCheckoutOrderDetails: GetCheckoutOrderDetails) =>
  (id: number, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderDetailsResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_DETAILS_REQUEST,
      });

      const result = await getCheckoutOrderDetails(id, config);

      dispatch({
        meta: { id },
        payload: normalize(result, checkoutDetailsSchema),
        type: actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_CHECKOUT_DETAILS_FAILURE,
      });

      throw error;
    }
  };

export default fetchCheckoutDetailsFactory;
