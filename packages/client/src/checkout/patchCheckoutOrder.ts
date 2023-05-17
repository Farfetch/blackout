import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PatchCheckoutOrder } from './types/index.js';

/**
 * Method responsible for changing the checkout information. This is used for any
 * type of changes to the checkout object. This also replaces the deprecated
 * putShippingOption function.
 *
 * @param checkoutOrderId - Universal identifier of the Checkout.
 * @param data   - Request data.
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
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchCheckoutOrder: PatchCheckoutOrder = (
  checkoutOrderId,
  data,
  config,
) =>
  client
    .patch(join('/checkout/v1/orders/', checkoutOrderId), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchCheckoutOrder;
