import client, { adaptError } from '../../helpers/client';

/**
 * Method responsible for loading the programs.
 *
 * @function getPrograms
 * @memberof module:loyalty/client
 *
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default config =>
  client
    .get('/loyalty/v1/programs', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
