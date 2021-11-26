import moxios from 'moxios';

export default {
  success: () => {
    moxios.stubRequest('/api/account/v1/emailtokens', {
      method: 'post',
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/emailtokens', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
