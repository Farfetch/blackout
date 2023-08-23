import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type Config,
  type DeleteCheckoutOrderPromocodes,
  type GetCheckoutOrderResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout.js';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument } from '../../../types/getOptionsArgument.types.js';
import type { StoreState } from '../../../types/storeState.types.js';

/**
 * Method responsible for removing promo code information from a checkout order.
 *
 * @param deleteCheckoutOrderPromocodes - Delete checkout order promocodes client.
 *
 * @returns Thunk factory.
 */
const removeCheckoutOrderPromocodesFactory =
  (deleteCheckoutOrderPromocodes: DeleteCheckoutOrderPromocodes) =>
  (checkoutOrderId: CheckoutOrder['id'], config?: Config) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_CHECKOUT_ORDER_PROMOCODES_REQUEST,
      });

      const result = await deleteCheckoutOrderPromocodes(
        checkoutOrderId,
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
        type: actionTypes.REMOVE_CHECKOUT_ORDER_PROMOCODES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_CHECKOUT_ORDER_PROMOCODES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeCheckoutOrderPromocodesFactory;
