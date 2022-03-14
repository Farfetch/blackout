import moxios from 'moxios';

export default {
  success: () => {
    moxios.stubRequest('/api/account/v1/emailtokensvalidation', {
      status: 204,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/emailtokensvalidation', {
      response: 'stub error',
      status: 404,
    });
  },
};
