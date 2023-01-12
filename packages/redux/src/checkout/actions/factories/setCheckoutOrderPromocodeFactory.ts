import * as actionTypes from '../../actionTypes';
import {
  CheckoutOrder,
  Config,
  GetCheckoutOrderResponse,
  PutCheckoutOrderPromocode,
  PutCheckoutOrderPromocodeData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument } from '../../../types/getOptionsArgument.types';
import type { StoreState } from '../../../types/storeState.types';

/**
 * Method responsible for adding promo code information.
 *
 * @param putCheckoutOrderPromocode - Put promocode client.
 *
 * @returns Thunk factory.
 */
const setCheckoutOrderPromocodeFactory =
  (putCheckoutOrderPromocode: PutCheckoutOrderPromocode) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    data: PutCheckoutOrderPromocodeData,
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
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_REQUEST,
      });

      const result = await putCheckoutOrderPromocode(
        checkoutOrderId,
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
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default setCheckoutOrderPromocodeFactory;
