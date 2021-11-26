import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params?.userId, 'orders', {
        query: get(params, 'query'),
      }),
      {
        method: 'get',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params?.userId, 'orders'),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
