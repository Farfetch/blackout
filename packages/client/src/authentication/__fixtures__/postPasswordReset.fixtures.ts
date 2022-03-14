import moxios from 'moxios';

export default {
  success: () => {
    moxios.stubRequest('/api/account/v1/users/passwordreset', {
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/users/passwordreset', {
      response: 'stub error',
      status: 404,
    });
  },
};
