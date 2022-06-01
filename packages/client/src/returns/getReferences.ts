import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetReferences } from './types';

/**
 * Method responsible for obtaining a specific return reference.
 *
 * @param id     - Return identifier.
 * @param name   - Reference name. Possible values: `ReturnNote`,
 *                 `ReturnCustomerRequestedAWB`,`ReturnLabelAWB`, `DropOffLocationsPage`.
 * @param query  - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getReferences: GetReferences = (id, name, query, config) =>
  client
    .get(join('/account/v1/returns', id, 'references', name, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getReferences;
