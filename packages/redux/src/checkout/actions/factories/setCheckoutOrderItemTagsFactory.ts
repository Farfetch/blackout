import * as actionTypes from '../../actionTypes';
import {
  type CheckoutOrder,
  type CheckoutOrderItem,
  type Config,
  type GetCheckoutOrderResponse,
  type PutCheckoutOrderItemTags,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument } from '../../../types/getOptionsArgument.types';
import type { StoreState } from '../../../types/storeState.types';

/**
 * Method responsible for updating the checkout item tags.
 *
 * @param putCheckoutOrderItemTags - Put item tags client.
 *
 * @returns Thunk factory.
 */
const setCheckoutOrderItemTagsFactory =
  (putCheckoutOrderItemTags: PutCheckoutOrderItemTags) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    itemId: CheckoutOrderItem['id'],
    data: string[],
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
        type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_REQUEST,
      });

      const result = await putCheckoutOrderItemTags(
        checkoutOrderId,
        itemId,
        data,
        config,
      );

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
        type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default setCheckoutOrderItemTagsFactory;
