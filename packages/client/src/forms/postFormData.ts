import client, { adaptError } from '../helpers/client';
import type { PostFormSchema } from './types';

/**
 * Method responsible for posting schemas by code.
 *
 * @param schemaCode - Schema code to filter for.
 * @param data       - Schema payload to be posted.
 * @param config     - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postFormData: PostFormSchema = (schemaCode, data, config) =>
  client
    .post(`/communication/v1/forms/${schemaCode}/data`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postFormData;
