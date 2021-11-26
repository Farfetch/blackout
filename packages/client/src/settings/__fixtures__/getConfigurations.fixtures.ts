import join from 'proper-url-join';
import moxios from 'moxios';
import type { Configurations, Query } from '../types';

export default {
  success: (params: { query: Query; response: Configurations }): void => {
    moxios.stubRequest(
      join('/api/settings/v1/configurations', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: Query }): void => {
    moxios.stubRequest(
      join('/api/settings/v1/configurations', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
