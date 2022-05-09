import join from 'proper-url-join';
import moxios from 'moxios';
import type { FormSchema, FormSchemaQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (
      schemaCode: string,
      query: FormSchemaQuery,
      response: FormSchema,
    ) => {
      moxios.stubRequest(
        // @ts-expect-error
        join(`api/communication/v1/forms/${schemaCode}`, {
          query,
        }),
        {
          response,
          status: 200,
        },
      );
    },
    failure: () => {
      moxios.stubRequest(/.*v1\/forms\/*./, {
        response: 'stub error',
        status: 404,
      });
    },
  },
};
