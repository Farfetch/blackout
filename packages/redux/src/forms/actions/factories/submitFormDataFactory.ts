import * as actionTypes from '../../actionTypes';
import {
  PostFormSchema,
  SubmitFormSchema,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
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
    try {
      dispatch({
        type: actionTypes.SUBMIT_FORM_REQUEST,
        meta: { schemaCode, data },
      });

      const result = await postFormData(schemaCode, data, config);

      dispatch({
        meta: { schemaCode, data },
        payload: result,
        type: actionTypes.SUBMIT_FORM_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { schemaCode, data },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.SUBMIT_FORM_FAILURE,
      });

      throw error;
    }
  };

export default submitFormDataFactory;
