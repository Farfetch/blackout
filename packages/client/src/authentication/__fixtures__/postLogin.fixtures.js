import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/legacy/v1/account/login', {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/account/login', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
