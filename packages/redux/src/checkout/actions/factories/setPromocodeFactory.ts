import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutResponse,
  PutPromocode,
  PutPromocodeData,
} from '@farfetch/blackout-client/checkout/types';

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
 * @param putPromocode - Put promocode client.
 *
 * @returns Thunk factory.
 */
const setPromocodeFactory =
  (putPromocode: PutPromocode) =>
  (id: number, data: PutPromocodeData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    try {
      dispatch({
        type: actionTypes.SET_PROMOCODE_REQUEST,
      });

      const result = await putPromocode(id, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: actionTypes.SET_PROMOCODE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.SET_PROMOCODE_FAILURE,
      });

      throw error;
    }
  };

export default setPromocodeFactory;
