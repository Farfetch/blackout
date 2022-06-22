import { get } from 'lodash';
import {
  getFormsError,
  getFormsIsLoading,
  getFormsSchemas,
  getSubmitFormDataError as getSubmitFormDataErrorFromReducer,
  getSubmitFormDataIsLoading,
} from './reducer';
import type { BlackoutError, FormSchema } from '@farfetch/blackout-client';
import type { FormsResult } from './types';
import type { StoreState } from '../types';

/**
 * Retrieves the error thrown by the fetchFormSchema request, by schemaCode.
 *
 * @example
 * ```
 * import \{ getFormSchemaError \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     error: getFormSchemaError(state, query)
 * \});
 *
 * ```
 *
 * @param state      - Application state.
 * @param schemaCode - Schema code to be filtered for.
 *
 * @returns Content error.
 */
export const getFormSchemaError = (
  state: StoreState,
  schemaCode: string,
): BlackoutError | null | undefined => {
  return getFormsError(state.forms)[schemaCode];
};

/**
 * Retrieves the loading condition to the fetchFormSchema request, by schema code.
 *
 * @example
 * ```
 * import \{ isFormSchemaLoading \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     isLoading: isFormSchemaLoading(state, query)
 * \});
 * ```
 *
 * @param state      - Application state.
 * @param schemaCode - Schema code to be filtered for.
 *
 * @returns If the form schema is loading or not.
 */
export const isFormSchemaLoading = (
  state: StoreState,
  schemaCode: string,
): boolean | undefined => getFormsIsLoading(state.forms)[schemaCode];

/**
 * Retrieves all form schemas.
 *
 * @example
 * ```
 * import \{ getFormSchemaByCode \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     form-code: getFormSchemaByCode('sample-code', state)
 * \});
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns All form schemas.
 */
export const getFormSchemas = (state: StoreState): FormsResult =>
  getFormsSchemas(state.forms);

/**
 * Retrieves a schema.
 *
 * @example
 * ```
 * import \{ getFormSchemaByCode \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     form-code: getFormSchemaByCode('sample-code', state)
 * \});
 *
 * ```
 *
 * @param state      - Application state.
 * @param schemaCode - Form code to filter for.
 *
 * @returns Forms schemas with a given schemaCode.
 */
export const getFormSchemaByCode = (
  state: StoreState,
  schemaCode: string,
): FormSchema | undefined =>
  get(getFormSchemas(state)[schemaCode], 'jsonSchema');

/**
 * Retrieves the error thrown by the postFormData request, by schemaCode.
 *
 * @example
 * ```
 * import \{ getSubmitFormDataError \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     error: submitFormSchemaError(state, query)
 * \});
 *
 * ```
 *
 * @param state      - Application state.
 * @param schemaCode - Schema code to be filtered for.
 *
 * @returns Form data error.
 */
export const getSubmitFormDataError = (
  state: StoreState,
  schemaCode: string,
): Error | null | undefined => {
  return getSubmitFormDataErrorFromReducer(state.forms)[schemaCode];
};

/**
 * Retrieves the loading condition to the getFormsSchemas request, by schema code.
 *
 * @example
 * ```
 * import \{ isSubmitFormDataLoading \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     isLoading: isSubmitFormDataLoading(state, query)
 * \});
 * ```
 *
 * @param state      - Application state.
 * @param schemaCode - Schema code to be filtered for.
 *
 * @returns If the form submit is loading or not.
 */
export const isSubmitFormDataLoading = (
  state: StoreState,
  schemaCode: string,
): boolean | undefined => getSubmitFormDataIsLoading(state.forms)[schemaCode];
