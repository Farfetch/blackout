import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderResponse,
  PostCheckoutOrder,
  PostCheckoutOrderDataWithBag,
  PostCheckoutOrderDataWithItems,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument } from '../../../types/getOptionsArgument.types';
import type { StoreState } from '../../../types/storeState.types';

/**
 * Method responsible for creating the checkout order. Note: The checkout entity
 * state will contains the orderStatus which is used to keep track of the latest
 * error when creating a new checkout order.
 *
 * @param postCheckoutOrder - Post checkout client.
 *
 * @returns Thunk factory.
 */
const createCheckoutOrderFactory =
  (postCheckoutOrder: PostCheckoutOrder) =>
  (
    data: PostCheckoutOrderDataWithItems | PostCheckoutOrderDataWithBag,
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
        type: actionTypes.CREATE_CHECKOUT_ORDER_REQUEST,
      });

      const result = await postCheckoutOrder(data, config);

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

        const id = result.checkoutOrder.id;

        delete normalizedResult.entities.checkoutOrders?.[id]
          .productImgQueryParam;
      }

      dispatch({
        payload: normalizedResult,
        type: actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_CHECKOUT_ORDER_FAILURE,
      });

      throw error;
    }
  };

export default createCheckoutOrderFactory;
