import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join('/api/legacy/v1/returns', params.id, {
        query: get(params, 'query'),
      }),
      {
        method: 'patch',
        response: get(params, 'response'),
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('/api/legacy/v1/returns', params.id, {
        query: get(params, 'query'),
      }),
      {
        method: 'patch',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
