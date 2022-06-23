import moxios from 'moxios';

export default {
  success: (): void => {
    moxios.stubRequest('/api/legacy/v1/account/logout', {
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/legacy/v1/account/logout', {
      response: 'stub error',
      status: 404,
    });
  },
};
