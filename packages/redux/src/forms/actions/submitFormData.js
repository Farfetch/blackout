import { postFormData } from '@farfetch/blackout-client/forms';
import { submitFormDataFactory } from './factories';

/**
 * @typedef {object} SubmitFormDataQuery
 * @alias SubmitFormDataQuery
 * @memberof module:forms/actions
 *
 * @property {object} schemaCode - Schema code to be changed.
 * @property {object} data - Schema content to update.
 */

/**
 * @callback SubmitFormDataThunkFactory
 *
 * @alias SubmitFormDataThunkFactory
 * @memberof module:forms/actions
 *
 * @param {string} schemaCode - Schema code to filter for.
 * @param {object} data - Form data payload to be posted.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 *  Method responsible for submiting a form data for a specific schema.
 *
 *  @memberof module:forms/actions
 *  @name submitFormData
 *  @type {SubmitFormDataThunkFactory}
 */
export default submitFormDataFactory(postFormData);
