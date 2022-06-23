import moxios from 'moxios';

export default {
  success: (): void => {
    moxios.stubRequest('/api/account/v1/emailtokens', {
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/account/v1/emailtokens', {
      response: 'stub error',
      status: 404,
    });
  },
};
