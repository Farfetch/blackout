import { CollectPoint, Query } from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: { query: Query; response: CollectPoint }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/collectpoints', { query: params.query }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: Query }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/collectpoints', { query: params.query }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
