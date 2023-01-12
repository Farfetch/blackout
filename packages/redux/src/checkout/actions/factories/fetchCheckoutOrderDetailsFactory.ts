import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrder,
  CheckoutOrderDetails,
  Config,
  GetCheckoutOrderDetails,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutDetailsSchema from '../../../entities/schemas/checkoutDetails';
import type { Dispatch } from 'redux';

/**
 * Method responsible for obtaining the checkout details. These are used for the
 * order confirmation.
 *
 * @param getCheckoutOrderDetails - Get checkout details client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderDetailsFactory =
  (getCheckoutOrderDetails: GetCheckoutOrderDetails) =>
  (checkoutOrderId: CheckoutOrder['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderDetails> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_REQUEST,
      });

      const result = await getCheckoutOrderDetails(checkoutOrderId, config);

      dispatch({
        meta: { id: checkoutOrderId },
        payload: normalize(result, checkoutDetailsSchema),
        type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderDetailsFactory;
