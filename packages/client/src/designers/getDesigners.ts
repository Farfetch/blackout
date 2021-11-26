import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetDesigners } from './types';

/**
 * Method responsible for retrieving all designers grouped by their first letter.
 *
 * @memberof module:designers/client
 *
 * @param   {object} [query] - Query parameters to apply.
 * @param   {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getDesigners: GetDesigners = (query, config) =>
  client
    .get(join('/legacy/v1/designers', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getDesigners;
