import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PatchCheckout } from './types';

/**
 * Method responsible for changing the checkout information. This is used for any
 * type of changes to the checkout object. This also replaces the deprecated
 * putShippingOption function.
 *
 * @param id     - Universal identifier of the Checkout.
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
const patchCheckout: PatchCheckout = (id, data, config) =>
  client
    .patch(join('/checkout/v1/orders/', id), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchCheckout;
