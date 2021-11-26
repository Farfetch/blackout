import join from 'proper-url-join';
import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (schemaCode, query, response) => {
      moxios.stubRequest(
        join(`api/communication/v1/forms/${schemaCode}`, {
          query,
        }),
        {
          method: 'get',
          response,
          status: 200,
        },
      );
    },
    failure: () => {
      moxios.stubRequest(/.*v1\/forms\/*./, {
        method: 'get',
        response: 'stub error',
        status: 404,
      });
    },
  },
};
