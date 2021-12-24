import * as actionTypes from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PostFormSchema,
  SubmitFormSchema,
} from '@farfetch/blackout-client/src/forms/types';
import type { SubmitFormSchemaAction } from '../../types';
import type { SubmitFormSchemaFactory } from './types';

/**
 * Method responsible for posting Form data based on a schema.
 *
 * @param postFormData - Post form data client.
 *
 * @returns Thunk factory.
 */
const submitFormDataFactory: SubmitFormSchemaFactory<PostFormSchema> =
  postFormData =>
  (schemaCode, data, config) =>
  async (
    dispatch: Dispatch<SubmitFormSchemaAction>,
  ): Promise<SubmitFormSchema> => {
    dispatch({
      type: actionTypes.SUBMIT_FORM_REQUEST,
      meta: { schemaCode, data },
    });

    try {
      const result = await postFormData(schemaCode, data, config);

      dispatch({
        meta: { schemaCode, data },
        payload: result,
        type: actionTypes.SUBMIT_FORM_SUCCESS,
      });

      return result;
    } catch (error: any) {
      dispatch({
        meta: { schemaCode, data },
        payload: { error },
        type: actionTypes.SUBMIT_FORM_FAILURE,
      });

      throw error;
    }
  };

export default submitFormDataFactory;
