import moxios from 'moxios';

export default {
  success: () => {
    moxios.stubRequest('/api/account/v1/emailtokensvalidation', {
      method: 'post',
      status: 204,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/emailtokensvalidation', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
