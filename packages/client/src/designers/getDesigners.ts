import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetDesigners } from './types';

/**
 * Method responsible for retrieving all designers grouped by their first letter.
 *
 * @param query  - Query parameters to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getDesigners: GetDesigners = (query, config) =>
  client
    .get(join('/legacy/v1/designers', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getDesigners;
