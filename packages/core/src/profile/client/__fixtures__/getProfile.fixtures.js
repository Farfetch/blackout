import join from 'proper-url-join';
import moxios from 'moxios';

const legacy = {
  success: params => {
    moxios.stubRequest(
      join('/api/legacy/v1/users/me', {
        query: {
          userExtraInfo: params.data,
        },
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
      join('/api/legacy/v1/users/me', {
        query: {
          userExtraInfo: params.data,
        },
      }),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};

const accsvc = {
  success: params => {
    moxios.stubRequest('/api/account/v1/users/me', {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/users/me', {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};

export default {
  legacy,
  accsvc,
};
