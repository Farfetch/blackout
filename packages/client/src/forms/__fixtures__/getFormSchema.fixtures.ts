import join from 'proper-url-join';
import moxios from 'moxios';
import type { FormSchema, FormSchemaQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (params: {
      schemaCode: string;
      query: FormSchemaQuery;
      response: FormSchema;
    }) => {
      moxios.stubRequest(
        join(`api/communication/v1/forms/${params.schemaCode}`, {
          query: params.query,
        }),
        {
          response: params.response,
          status: 200,
        },
      );
    },
    failure: (): void => {
      moxios.stubRequest(/.*v1\/forms\/*./, {
        response: 'stub error',
        status: 404,
      });
    },
  },
};
