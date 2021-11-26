import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetFormSchemaQuery
 *
 * @alias GetFormSchemaQuery
 * @memberof module:forms
 *
 * @property {boolean} [includeJsonSchema] - Flag indicating whether the JSON schema should be included on the response.
 * @property {boolean} [resolveJsonSchemaPresets] - Flag indicating whether preset JSON schema should be expanded.
 */

/**
 *
 * Method responsible for fetching schemas by code.
 *
 * @function getFormSchema
 * @memberof module:forms
 *
 * @param {string} schemaCode - Schema code to filter for.
 * @param {GetFormSchemaQuery} [query] - Query object with search terms to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve then the call to the endpoint finishes.
 */
export default (schemaCode, query, config) =>
  client
    .get(join(`/communication/v1/forms/${schemaCode}`, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
