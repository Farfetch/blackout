import moxios from 'moxios';
import type { SubmitFormSchema } from '../types';

/**
 * Response payloads.
 */
export default {
  post: {
    success: (params: {
      schemaCode: string;
      response: SubmitFormSchema;
    }): void => {
      moxios.stubRequest(
        `/api/communication/v1/forms/${params.schemaCode}/data`,
        {
          response: params.response,
          status: 200,
        },
      );
    },
    error: (params: { schemaCode: string }): void => {
      moxios.stubRequest(
        `/api/communication/v1/forms/${params.schemaCode}/data`,
        {
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
};
