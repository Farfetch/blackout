import adaptOrderDetails from './helpers/adaptOrderDetails';
import client, { adaptError } from '../../helpers/client';
import isString from 'lodash/isString';
import join from 'proper-url-join';

/**
 * Method responsible for fetching the details of an guest user order.
 *
 * @function getGuestOrderDetails
 * @memberof module:orders/client
 *
 * @param {string} orderId - The orderID to get the details.
 * @param {string} guestUserEmail - The guest user email.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (orderId, guestUserEmail, config) => {
  const containsGuestUserEmail = isString(guestUserEmail);
  const args = containsGuestUserEmail
    ? [
        '/legacy/v1/guestorders/',
        orderId,
        { query: { guestUserEmail, guestUserSecretCode: orderId } },
      ]
    : ['/account/v1/guestorders/', orderId];

  return client
    .get(join(...args), config)
    .then(response =>
      containsGuestUserEmail ? response.data : adaptOrderDetails(response.data),
    )
    .catch(error => {
      throw adaptError(error);
    });
};
