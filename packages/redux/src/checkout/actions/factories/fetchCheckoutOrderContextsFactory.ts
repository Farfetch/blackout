import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type CheckoutOrderContext,
  type Config,
  type GetCheckoutOrderContexts,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutOrderContext from '../../../entities/schemas/checkoutOrderContext.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for obtaining the checkout order contexts.
 *
 * @param getCheckoutOrderContexts - Get checkout order contexts client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderContextsFactory =
  (getCheckoutOrderContexts: GetCheckoutOrderContexts) =>
  (checkoutOrderId: CheckoutOrder['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderContext[]> => {
    dispatch({
      type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXTS_REQUEST,
    });

    try {
      const result = await getCheckoutOrderContexts(checkoutOrderId, config);

      dispatch({
        payload: normalize(result, [checkoutOrderContext]),
        type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXTS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXTS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderContextsFactory;
