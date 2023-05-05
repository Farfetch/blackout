import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type CheckoutOrderContext,
  type Config,
  type GetCheckoutOrderContext,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutOrderContext from '../../../entities/schemas/checkoutOrderContext.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for getting the checkout order context.
 *
 * @param getCheckoutOrderContext - Get checkout order context client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderContextFactory =
  (getCheckoutOrderContext: GetCheckoutOrderContext) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    contextId: CheckoutOrderContext['id'],
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderContext> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXT_REQUEST,
      });

      const result = await getCheckoutOrderContext(
        checkoutOrderId,
        contextId,
        config,
      );

      dispatch({
        payload: normalize(result, checkoutOrderContext),
        type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_CONTEXT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCheckoutOrderContextFactory;
