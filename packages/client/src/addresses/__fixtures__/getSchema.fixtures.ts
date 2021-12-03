import moxios from 'moxios';
import type { Schema } from '../types';

export default {
  success: (params: { isoCode: string; response: Schema }): void => {
    moxios.stubRequest(
      `/api/account/v1/countries/${params.isoCode}/addressSchemas`,
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { isoCode: string }): void => {
    moxios.stubRequest(
      `/api/account/v1/countries/${params.isoCode}/addressSchemas`,
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
