import moxios from 'moxios';
const baseUrl =
  'https://api.blackandwhite-ff.com/authentication/v1/guestTokens';

export default {
  success: params => {
    moxios.stubRequest(baseUrl, {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest(baseUrl, {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
