import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderResponse,
  PutCheckoutOrderPromocode,
  PutCheckoutOrderPromocodeData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';

/**
 * @param id     - Universal identifier of the Checkout.
 * @param data   - Data to add a promocode.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for adding promo code information.
 *
 * @param putCheckoutOrderPromocode - Put promocode client.
 *
 * @returns Thunk factory.
 */
const setPromocodeFactory =
  (putCheckoutOrderPromocode: PutCheckoutOrderPromocode) =>
  (id: number, data: PutCheckoutOrderPromocodeData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.SET_PROMOCODE_REQUEST,
      });

      const result = await putCheckoutOrderPromocode(id, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: actionTypes.SET_PROMOCODE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.SET_PROMOCODE_FAILURE,
      });

      throw error;
    }
  };

export default setPromocodeFactory;
