import { get } from 'lodash';
import {
  getFormsError,
  getFormsIsLoading,
  getFormsSchemas,
  getSubmitFormDataError as getSubmitFormDataErrorFromReducer,
  getSubmitFormDataIsLoading,
} from './reducer';
import type { Error } from '@farfetch/blackout-client/types';
import type { FormResult } from './types';
import type { StoreState } from '../types';

/**
 * Retrieves the error thrown by the fetchFormSchema request, by schemaCode.
 *
 * @param state - Application state.
 * @param schemaCode - Schema code to be filtered for.
 *
 * @returns Content error.
 *
 * @example
 * import \{ getFormSchemaError \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     error: getFormSchemaError(state, query)
 * \});
 *
 */
export const getFormSchemaError = (
  state: StoreState,
  schemaCode: string,
): Error | null | undefined => {
  return getFormsError(state.forms)[schemaCode];
};

/**
 * Retrieves the loading condition to the fetchFormSchema request, by schema code.
 *
 * @param state - Application state.
 * @param schemaCode - Schema code to be filtered for.
 *
 * @returns If the form schema is loading or not.
 *
 * @example
 * import \{ isFormSchemaLoading \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     isLoading: isFormSchemaLoading(state, query)
 * \});
 */
export const isFormSchemaLoading = (
  state: StoreState,
  schemaCode: string,
): boolean | undefined => getFormsIsLoading(state.forms)[schemaCode];

/**
 * Retrieves all form schemas.
 *
 * @param state - Application state.
 *
 * @returns All form schemas.
 *
 * @example
 * import \{ getFormSchemaByCode \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     form-code: getFormSchemaByCode('sample-code', state)
 * \});
 *
 */
export const getFormSchemas = (state: StoreState): FormResult =>
  getFormsSchemas(state.forms);

/**
 * Retrieves a schema.
 *
 * @param state - Application state.
 * @param schemaCode - Form code to filter for.
 *
 * @returns Forms schemas with a given schemaCode.
 *
 * @example
 * import \{ getFormSchemaByCode \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     form-code: getFormSchemaByCode('sample-code', state)
 * \});
 *
 */
export const getFormSchemaByCode = (
  state: StoreState,
  schemaCode: string,
): [] => get(getFormSchemas(state)[schemaCode], 'jsonSchema', []) as [];

/**
 * Retrieves the error thrown by the postFormData request, by schemaCode.
 *
 * @param state - Application state.
 * @param schemaCode - Schema code to be filtered for.
 *
 * @returns Form data error.
 *
 * @example
 * import \{ getSubmitFormDataError \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     error: submitFormSchemaError(state, query)
 * \});
 *
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
 * @param state - Application state.
 * @param schemaCode - Schema code to be filtered for.
 *
 * @returns If the form submit is loading or not.
 *
 * @example
 * import \{ isSubmitFormDataLoading \} from '\@farfetch/blackout-redux/forms';
 *
 * const mapStateToProps = (state, \{ query \}) =\> (\{
 *     isLoading: isSubmitFormDataLoading(state, query)
 * \});
 */
export const isSubmitFormDataLoading = (
  state: StoreState,
  schemaCode: string,
): boolean | undefined => getSubmitFormDataIsLoading(state.forms)[schemaCode];
