import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import checkoutSchema from '../../../entities/schemas/checkout';
import type {
  Config,
  GetCheckoutOrderResponse,
  PatchCheckoutOrder,
  PatchCheckoutOrderData,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
 * @param patchCheckoutOrder - Patch checkout client.
 *
 * @returns Thunk factory.
 */
const updateCheckoutFactory =
  (patchCheckoutOrder: PatchCheckoutOrder) =>
  (id: number, data: PatchCheckoutOrderData, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_REQUEST,
      });

      const result = await patchCheckoutOrder(id, data, config);

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
