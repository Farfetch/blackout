import { fetchFormSchemaFactory } from './factories';
import { getFormSchema } from '@farfetch/blackout-client/forms';

/**
 * @typedef {object} FetchFormSchemaQuery
 * @alias FetchFormSchemaQuery
 * @memberof module:forms/actions
 *
 * @property {boolean} [includeJsonSchema] - Flag indicating whether the JSON schema should be included on the response.
 * @property {boolean} [resolveJsonSchemaPresets] - Flag indicating whether preset JSON schema should be expanded.
 */

/**
 * @callback FetchFormSchemaThunkFactory
 *
 * @alias FetchFormSchemaThunkFactory
 * @memberof module:forms/actions
 *
 * @param {string} schemaCode - Schema code to filter for.
 * @param {FetchFormSchemaQuery} [query] - Query object with search terms to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 *  Method responsible for retrieving a form schema.
 *
 *  @memberof module:forms/actions
 *  @name fetchFormSchema
 *  @type {FetchFormSchemaThunkFactory}
 */
export default fetchFormSchemaFactory(getFormSchema);
