import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  post: {
    success: (schemaCode, response) => {
      moxios.stubRequest(`/api/communication/v1/forms/${schemaCode}/data`, {
        method: 'post',
        response: response,
        status: 200,
      });
    },
    error: schemaCode => {
      moxios.stubRequest(`/api/communication/v1/forms/${schemaCode}/data`, {
        method: 'post',
        response: 'stub error',
        status: 404,
      });
    },
  },
};
