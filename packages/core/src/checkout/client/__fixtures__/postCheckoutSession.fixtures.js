import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/checkoutsession', {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/checkoutsession', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
