import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  FormSchema,
  SubmitFormSchema,
} from '@farfetch/blackout-client/forms/types';

interface FetchFormSchemaRequestAction {
  type: typeof actionTypes.FETCH_FORM_SCHEMA_REQUEST;
  meta: { schemaCode: string };
}
export interface FetchFormSchemaSuccessAction {
  type: typeof actionTypes.FETCH_FORM_SCHEMA_SUCCESS;
  payload: FormSchema;
  meta: { schemaCode: string };
}
interface FetchFormSchemaFailureAction {
  type: typeof actionTypes.FETCH_FORM_SCHEMA_FAILURE;
  payload: { error: Error };
  meta: { schemaCode: string };
}

/** Actions dispatched when the fetch form schema request is made. */
export type FetchFormSchemaAction =
  | FetchFormSchemaRequestAction
  | FetchFormSchemaSuccessAction
  | FetchFormSchemaFailureAction;

interface SubmitFormSchemaRequestAction extends Action {
  type: typeof actionTypes.SUBMIT_FORM_REQUEST;
  meta: { schemaCode: string; data: unknown };
}
interface SubmitFormSchemaSuccessAction extends Action {
  type: typeof actionTypes.SUBMIT_FORM_SUCCESS;
  payload: SubmitFormSchema;
  meta: { schemaCode: string; data: unknown };
}
interface SubmitFormSchemaFailureAction extends Action {
  type: typeof actionTypes.SUBMIT_FORM_FAILURE;
  payload: { error: Error };
  meta: { schemaCode: string; data: unknown };
}

/** Actions dispatched when submits form schema request is made. */
export type SubmitFormSchemaAction =
  | SubmitFormSchemaRequestAction
  | SubmitFormSchemaSuccessAction
  | SubmitFormSchemaFailureAction;

/** Actions dispatched when the reset form schemas action is called. */
export interface ResetFormSchemaStateAction extends Action {
  type: typeof actionTypes.RESET_SCHEMAS;
}
