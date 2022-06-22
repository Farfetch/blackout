import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutResponse,
  PatchCheckout,
  PatchCheckoutData,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @param id     - Universal identifier of the Checkout.
 * @param data   - Checkout object.
 * @param config - Custom configurations to send to the client instance (axios). In this case is truly
 *                 recommended to update your axios config to your new shipping or billing address,
 *                 like this:
 *                  const config = \{
 *                    headers:\{
 *                      'Accept-Language': cultureCode,
 *                      'FF-Country': countryCode,
 *                      'FF-Currency': currencyCode
 *                     \}
 *                  \}.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for changing the checkout information. This is used for any
 * type of changes to the checkout object. This also replaces the deprecated
 * putShippingOption function.
 *
 * @param patchCheckout - Patch checkout client.
 *
 * @returns Thunk factory.
 */
const updateCheckoutFactory =
  (patchCheckout: PatchCheckout) =>
  (id: number, data: PatchCheckoutData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_REQUEST,
      });

      const result = await patchCheckout(id, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.UPDATE_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };

export default updateCheckoutFactory;
