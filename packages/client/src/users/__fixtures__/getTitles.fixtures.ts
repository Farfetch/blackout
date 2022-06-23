import join from 'proper-url-join';
import moxios from 'moxios';
import type { GetTitlesQuery, GetTitlesResponse } from '../types';

export default {
  success: (params: {
    query?: GetTitlesQuery;
    response: GetTitlesResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/titles', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (): void => {
    moxios.stubRequest(join('/api/account/v1/titles'), {
      response: 'stub error',
      status: 404,
    });
  },
};
