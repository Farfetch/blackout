import moxios from 'moxios';

export default {
  success: () => {
    moxios.stubRequest('/api/account/v1/users/passwordrecover', {
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/users/passwordrecover', {
      response: 'stub error',
      status: 404,
    });
  },
};
