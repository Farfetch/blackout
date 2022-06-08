import moxios from 'moxios';

export default {
  success: () => {
    moxios.stubRequest('/api/legacy/v1/account/password/retrieve', {
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/account/password/retrieve', {
      response: 'stub error',
      status: 404,
    });
  },
};
