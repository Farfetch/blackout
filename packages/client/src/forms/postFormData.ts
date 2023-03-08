import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { PostFormData } from './types/index.js';

/**
 * Method responsible for posting schemas by code.
 *
 * @param schemaCode - Schema code to filter for.
 * @param data       - Schema payload to be posted.
 * @param config     - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postFormData: PostFormData = (schemaCode, data, config) =>
  client
    .post(`/communication/v1/forms/${schemaCode}/data`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postFormData;
