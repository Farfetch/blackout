import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrder,
  Config,
  GetCheckoutOrder,
  GetCheckoutOrderQuery,
  GetCheckoutOrderResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * Method responsible for obtaining the checkout.
 *
 * @param getCheckoutOrder - Get checkout client.
 *
 * @returns Thunk factory.
 */

const fetchCheckoutOrderFactory =
  (getCheckoutOrder: GetCheckoutOrder) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    query?: GetCheckoutOrderQuery,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CHECKOUT_ORDER_REQUEST,
      });

      const result = await getCheckoutOrder(checkoutOrderId, query, config);

      if (result.checkoutOrder) {
        const { productImgQueryParam } = getOptions(getState);
        (
          result.checkoutOrder as { productImgQueryParam?: string }
        ).productImgQueryParam = productImgQueryParam;
      }

      const normalizedResult = normalize(result, checkoutSchema);

      // Cleanup productImgQueryParam
      if (result.checkoutOrder) {
        delete (result.checkoutOrder as { productImgQueryParam?: string })
          .productImgQueryParam;

        delete normalizedResult.entities.checkoutOrders?.[checkoutOrderId]
          .productImgQueryParam;
      }

      dispatch({
        payload: normalizedResult,
        type: actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CHECKOUT_ORDER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };
export default fetchCheckoutOrderFactory;
