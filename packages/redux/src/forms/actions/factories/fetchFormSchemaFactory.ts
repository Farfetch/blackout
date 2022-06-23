import * as actionTypes from '../../actionTypes';
import {
  FormSchema,
  GetFormSchema,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchFormSchemaAction } from '../../types';
import type { FetchFormSchemaFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client fo fetch
 * form schemas.
 *
 * @param getFormSchema - Get form schema client.
 *
 * @returns Thunk factory.
 */
const fetchFormSchemaFactory: FetchFormSchemaFactory<GetFormSchema> =
  getFormSchema =>
  (schemaCode, query, config) =>
  async (dispatch: Dispatch<FetchFormSchemaAction>): Promise<FormSchema> => {
    try {
      dispatch({
        meta: { schemaCode },
        type: actionTypes.FETCH_FORM_SCHEMA_REQUEST,
      });

      const result = await getFormSchema(schemaCode, query, config);

      dispatch({
        meta: { schemaCode },
        payload: result,
        type: actionTypes.FETCH_FORM_SCHEMA_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { schemaCode },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_FORM_SCHEMA_FAILURE,
      });

      throw error;
    }
  };

export default fetchFormSchemaFactory;
