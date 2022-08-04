import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderResponse,
  PatchCheckoutOrder,
  PatchCheckoutOrderData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';

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
  (id: number, data: PatchCheckoutOrderData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST,
      });

      const result = await patchCheckoutOrder(id, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
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
