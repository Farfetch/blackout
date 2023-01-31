import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for retrieving all designers grouped by their first letter.
 *
 * @function getDesigners
 * @memberof module:designers/client
 *
 * @param   {object} [query] - Query parameters to apply.
 * @param   {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (query, config) =>
  client
    .get(join('/legacy/v1/designers', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
