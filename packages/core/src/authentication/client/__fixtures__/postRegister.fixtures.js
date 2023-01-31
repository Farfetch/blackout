import moxios from 'moxios';

export const legacy = {
  success: params => {
    moxios.stubRequest('/api/legacy/v1/account/register', {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/account/register', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};

export const accsvc = {
  success: params => {
    moxios.stubRequest('/api/account/v1/users', {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/users', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
