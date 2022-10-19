import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrder,
  Config,
  GetCheckoutOrderResponse,
  PatchCheckoutOrder,
  PatchCheckoutOrderData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument } from '../../../types/getOptionsArgument.types';
import type { StoreState } from '../../../types/storeState.types';

/**
 * Method responsible for changing the checkout information. This is used for any
 * type of changes to the checkout object. This also replaces the deprecated
 * putShippingOption function.
 *
 * @param patchCheckoutOrder - Patch checkout client.
 *
 * @returns Thunk factory.
 */
const updateCheckoutOrderFactory =
  (patchCheckoutOrder: PatchCheckoutOrder) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    data: PatchCheckoutOrderData,
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
        type: actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST,
      });

      const result = await patchCheckoutOrder(checkoutOrderId, data, config);

      if (result.checkoutOrder) {
        const { productImgQueryParam } = getOptions(getState);
        (
          result.checkoutOrder as unknown as { productImgQueryParam?: string }
        ).productImgQueryParam = productImgQueryParam;
      }

      const normalizedResult = normalize(result, checkoutSchema);

      // Cleanup productImgQueryParam
      if (result.checkoutOrder) {
        delete (
          result.checkoutOrder as unknown as { productImgQueryParam?: string }
        ).productImgQueryParam;

        delete normalizedResult.entities.checkoutOrders?.[checkoutOrderId]
          .productImgQueryParam;
      }

      dispatch({
        payload: normalizedResult,
        type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_CHECKOUT_ORDER_FAILURE,
      });

      throw error;
    }
  };

export default updateCheckoutOrderFactory;
