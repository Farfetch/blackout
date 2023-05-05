import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type Config,
  type PostCheckoutOrderContext,
  type PostCheckoutOrderContextData,
  type PostCheckoutOrderContextResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutOrderContext from '../../../entities/schemas/checkoutOrderContext.js';
import type { CreateCheckoutOrderContextAction } from '../../types/index.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating a checkout order context.
 *
 * @param postCheckoutOrderContext - Post checkout order context client.
 *
 * @returns Thunk factory.
 */
const createCheckoutOrderContext =
  (postCheckoutOrderContext: PostCheckoutOrderContext) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    data: PostCheckoutOrderContextData,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<CreateCheckoutOrderContextAction>,
  ): Promise<PostCheckoutOrderContextResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_REQUEST,
      });

      const result = await postCheckoutOrderContext(
        checkoutOrderId,
        data,
        config,
      );
      // The contextId is only accessible through the 'location' header.
      const contextId: string =
        result?.headers.location?.split('contexts/')[1] || '';

      dispatch({
        payload: normalize(result.data, checkoutOrderContext),
        meta: { contextId },
        type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_CHECKOUT_ORDER_CONTEXT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createCheckoutOrderContext;
