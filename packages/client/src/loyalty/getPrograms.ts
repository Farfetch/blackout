import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { GetPrograms } from './types/index.js';

/**
 * Method responsible for loading the programs.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPrograms: GetPrograms = config =>
  client
    .get('/loyalty/v1/programs', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPrograms;
