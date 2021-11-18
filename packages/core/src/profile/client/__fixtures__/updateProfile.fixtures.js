import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  update: {
    success: params => {
      moxios.stubRequest(
        join('/api/account/v1/users', params.profileId, {
          query: get(params, 'query'),
        }),
        {
          method: 'put',
          response: get(params, 'response'),
          status: 200,
        },
      );
    },
    failure: params => {
      moxios.stubRequest(
        join('/api/account/v1/users', params.profileId, {
          query: get(params, 'query'),
        }),
        {
          method: 'put',
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
};
