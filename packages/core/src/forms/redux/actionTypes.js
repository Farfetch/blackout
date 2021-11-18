/**
 * @module forms/actionTypes
 * @category Forms
 * @subcategory Actions
 */

/** Action type dispatched when the get form schema request starts. */
export const GET_FORM_SCHEMA_REQUEST =
  '@farfetch/blackout-core/GET_FORM_SCHEMA_REQUEST';
/** Action type dispatched when the get form schema request succeeds. */
export const GET_FORM_SCHEMA_SUCCESS =
  '@farfetch/blackout-core/GET_FORM_SCHEMA_SUCCESS';
/** Action type dispatched when the get form schema request fails. */
export const GET_FORM_SCHEMA_FAILURE =
  '@farfetch/blackout-core/GET_FORM_SCHEMA_FAILURE';

/** Action type dispatched when the submit form request starts. */
export const SUBMIT_FORM_REQUEST =
  '@farfetch/blackout-core/SUBMIT_FORM_REQUEST';
/** Action type dispatched when the submit form request succeeds. */
export const SUBMIT_FORM_SUCCESS =
  '@farfetch/blackout-core/SUBMIT_FORM_SUCCESS';
/** Action type dispatched when the submit form request fails. */
export const SUBMIT_FORM_FAILURE =
  '@farfetch/blackout-core/SUBMIT_FORM_FAILURE';

/** Action type dispatched by [resetFormSchema]{@link module:forms/actions.resetFormSchema} thunk. */
export const RESET_SCHEMAS = '@farfetch/blackout-core/RESET_SCHEMAS';
