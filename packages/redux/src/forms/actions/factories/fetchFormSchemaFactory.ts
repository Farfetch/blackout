import * as actionTypes from '../../actionTypes';
import type { Dispatch } from 'redux';
import type { FetchFormSchemaAction } from '../../types';
import type { FetchFormSchemaFactory } from './types';
import type {
  FormSchema,
  GetFormSchema,
} from '@farfetch/blackout-client/forms/types';

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
    dispatch({
      meta: { schemaCode },
      type: actionTypes.FETCH_FORM_SCHEMA_REQUEST,
    });

    try {
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
        payload: { error },
        type: actionTypes.FETCH_FORM_SCHEMA_FAILURE,
      });

      throw error;
    }
  };

export default fetchFormSchemaFactory;
