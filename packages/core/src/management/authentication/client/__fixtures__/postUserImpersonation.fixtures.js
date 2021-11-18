import moxios from 'moxios';
const baseUrl =
  'https://management.blackandwhite-ff.com/authentication/v1/userImpersonations';

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
