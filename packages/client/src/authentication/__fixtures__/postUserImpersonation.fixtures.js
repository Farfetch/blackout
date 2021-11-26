import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/authentication/v1/userImpersonations', {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/authentication/v1/userImpersonations', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
