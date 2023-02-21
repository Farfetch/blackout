import * as actionTypes from '../../actionTypes';
import {
  type PostFormData,
  type SubmittedFormData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { SubmitFormDataAction } from '../../types';
import type { SubmitFormDataFactory } from './types';

/**
 * Method responsible for posting Form data based on a schema.
 *
 * @param postFormData - Post form data client.
 *
 * @returns Thunk factory.
 */
const submitFormDataFactory: SubmitFormDataFactory<PostFormData> =
  postFormData =>
  (schemaCode, data, config) =>
  async (
    dispatch: Dispatch<SubmitFormDataAction>,
  ): Promise<SubmittedFormData> => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { schemaCode, data },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.SUBMIT_FORM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default submitFormDataFactory;
