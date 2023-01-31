import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Obtains the item's provisioning for the specified bundle.
 *
 * @function getItemDeliveryProvisioning
 * @memberof module:checkout/client
 *
 * @param {string} id - Identifier of the checkout order.
 * @param {string} deliveryBundleId - Identifier of the delivery bundle.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, deliveryBundleId, config) =>
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
