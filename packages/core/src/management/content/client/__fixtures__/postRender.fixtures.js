import join from 'proper-url-join';
import moxios from 'moxios';

const baseUrl = 'https://api.blackandwhite-ff.com/content/v1';

export default {
  success: params => {
    moxios.stubRequest(join(baseUrl, 'render'), {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest(join(baseUrl, 'render'), {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
