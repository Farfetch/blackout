import moxios from 'moxios';

export default {
  success: () => {
    moxios.stubRequest('/api/account/v1/users/passwordrecover', {
      method: 'post',
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/users/passwordrecover', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
