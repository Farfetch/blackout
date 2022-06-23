import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetFormSchema } from './types';

/**
 * Method responsible for fetching schemas by code.
 *
 * @param schemaCode - Schema code to filter for.
 * @param query      - Query object with search terms to apply.
 * @param config     - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getFormSchema: GetFormSchema = (
  schemaCode,
  query = undefined,
  config = undefined,
) => {
  return client
    .get(join(`/communication/v1/forms/${schemaCode}`, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getFormSchema;
