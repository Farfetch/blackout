import client, { adaptError } from '../helpers/client';

/**
 * Sets the address specified with 'id', as the default billing address.
 *
 * @function putDefaultBillingAddress
 * @memberof module:addresses/client
 *
 * @param {Object} props
 * @param {string} props.id - Identifier of the address.
 * @param {number} props.userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<string|object>} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ userId, id }, config) =>
  client
    .put(`/account/v1/users/${userId}/addresses/billing/${id}`, {}, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
