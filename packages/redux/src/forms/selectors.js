/**
 * @module forms/selectors
 * @category Forms
 * @subcategory Selectors
 */

import { get } from 'lodash';
import {
  getFormsError,
  getFormsIsLoading,
  getFormsSchemas,
  getSubmitFormDataError as getSubmitFormDataErrorFromReducer,
  getSubmitFormDataIsLoading,
} from './reducer';

/**
 * Retrieves the error thrown by the fetchFormSchema request, by schemaCode.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} schemaCode - Schema code to be filtered for.
 *
 * @returns {?object} - Content error.
 *
 * @example
 * import { getFormSchemaError } from '@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     error: getFormSchemaError(state, query)
 * });
 *
 */
export const getFormSchemaError = (state, schemaCode) => {
  return getFormsError(state.forms)[schemaCode];
};

/**
 * Retrieves the loading condition to the fetchFormSchema request, by schema code.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} schemaCode - Schema code to be filtered for.
 *
 * @returns {boolean} - If the form schema is loading or not.
 *
 * @example
 * import { isFormSchemaLoading } from '@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     isLoading: isFormSchemaLoading(state, query)
 * });
 */
export const isFormSchemaLoading = (state, schemaCode) =>
  getFormsIsLoading(state.forms)[schemaCode];

/**
 * Retrieves all form schemas.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} - All form schemas.
 *
 * @example
 * import { getFormSchemaByCode } from '@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     form-code: getFormSchemaByCode('sample-code', state)
 * });
 *
 */
export const getFormSchemas = state => getFormsSchemas(state.forms);

/**
 * Retrieves a schema.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} schemaCode - Form code to filter for.
 *
 * @returns {Array} - Forms schemas with a given schemaCode.
 *
 * @example
 * import { getFormSchemaByCode } from '@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     form-code: getFormSchemaByCode('sample-code', state)
 * });
 *
 */
export const getFormSchemaByCode = (state, schemaCode) =>
  get(getFormSchemas(state)[schemaCode], 'jsonSchema');
/**
 * Retrieves the error thrown by the postFormData request, by schemaCode.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} schemaCode - Schema code to be filtered for.
 *
 * @returns {?object} - Form data error.
 *
 * @example
 * import { getSubmitFormDataError } from '@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     error: submitFormSchemaError(state, query)
 * });
 *
 */
export const getSubmitFormDataError = (state, schemaCode) => {
  return getSubmitFormDataErrorFromReducer(state.forms)[schemaCode];
};

/**
 * Retrieves the loading condition to the getFormsSchemas request, by schema code.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} schemaCode - Schema code to be filtered for.
 *
 * @returns {boolean} - If the form submit is loading or not.
 *
 * @example
 * import { isSubmitFormDataLoading } from '@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, { query }) => ({
 *     isLoading: isSubmitFormDataLoading(state, query)
 * });
 */
export const isSubmitFormDataLoading = (state, schemaCode) =>
  getSubmitFormDataIsLoading(state.forms)[schemaCode];
