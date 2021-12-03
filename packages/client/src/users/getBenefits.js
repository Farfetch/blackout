import client, { adaptError } from '../helpers/client';

/**
 * Method responsible for getting user benefits.
 *
 * @function getBenefits
 * @memberof module:users/client
 *
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default config =>
  client
    .get('/legacy/v1/userbenefits', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
