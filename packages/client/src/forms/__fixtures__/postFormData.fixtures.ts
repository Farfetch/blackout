import moxios from 'moxios';
import type { SubmitFormSchema } from '../types';

/**
 * Response payloads.
 */
export default {
  post: {
    success: (schemaCode: string, response: SubmitFormSchema) => {
      moxios.stubRequest(`/api/communication/v1/forms/${schemaCode}/data`, {
        response: response,
        status: 200,
      });
    },
    error: (schemaCode: string) => {
      moxios.stubRequest(`/api/communication/v1/forms/${schemaCode}/data`, {
        response: 'stub error',
        status: 404,
      });
    },
  },
};
