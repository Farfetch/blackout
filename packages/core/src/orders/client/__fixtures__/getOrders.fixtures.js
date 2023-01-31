import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';

const getQuery = params => get(params, 'query');

export const legacy = {
  success: params => {
    moxios.stubRequest(
      join('/api/legacy/v1/orders', {
        query: getQuery(params),
      }),
      {
        method: 'get',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/orders', {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};

export const accsvc = {
  success: params => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params?.userId, 'orders', {
        query: getQuery(params),
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
