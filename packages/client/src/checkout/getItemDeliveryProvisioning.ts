import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetItemDeliveryProvisioning } from './types';

/**
 * Obtains the item's provisioning for the specified bundle.
 *
 * @param id               - Identifier of the checkout order.
 * @param deliveryBundleId - Identifier of the delivery bundle.
 * @param config           - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getItemDeliveryProvisioning: GetItemDeliveryProvisioning = (
  id,
  deliveryBundleId,
  config,
) =>
  client
    .get(
      join(
        '/checkout/v1/orders/',
        id,
        'deliveryBundles/',
        deliveryBundleId,
        'itemDeliveryProvisioning',
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getItemDeliveryProvisioning;
