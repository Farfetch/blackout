import moxios from 'moxios';

export default {
  success: () => {
    moxios.stubRequest('/api/account/v1/users/passwordreset', {
      method: 'post',
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/users/passwordreset', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
