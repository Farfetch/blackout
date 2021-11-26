import moxios from 'moxios';

export default {
  success: () => {
    moxios.stubRequest('/api/legacy/v1/account/logout', {
      method: 'post',
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/account/logout', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
