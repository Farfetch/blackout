import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type CheckoutOrderContext,
  type Config,
  type DeleteCheckoutOrderContext,
  type DeleteCheckoutOrderContextResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemoveCheckoutOrderContextAction } from '../../index.js';

/**
 * Method responsible for deleting a checkout order context.
 *
 * @param deleteCheckoutOrderContext - Delete checkout order context client.
 *
 * @returns Thunk factory.
 */
const removeCheckoutOrderContextFactory =
  (deleteCheckoutOrderContext: DeleteCheckoutOrderContext) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    contextId: CheckoutOrderContext['id'],
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<RemoveCheckoutOrderContextAction>,
  ): Promise<DeleteCheckoutOrderContextResponse> => {
    dispatch({
      type: actionTypes.REMOVE_CHECKOUT_ORDER_CONTEXT_REQUEST,
    });

    try {
      const result = await deleteCheckoutOrderContext(
        checkoutOrderId,
        contextId,
        config,
      );

      dispatch({
        type: actionTypes.REMOVE_CHECKOUT_ORDER_CONTEXT_SUCCESS,
        payload: result,
        meta: { contextId },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_CHECKOUT_ORDER_CONTEXT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeCheckoutOrderContextFactory;
