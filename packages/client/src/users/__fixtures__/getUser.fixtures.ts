import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/account/v1/users/me', {
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/users/me', {
      response: 'stub error',
      status: 404,
    });
  },
};
