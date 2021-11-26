import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (emailHash, response) => {
    moxios.stubRequest(join('/api/marketing/v1/subscriptions', emailHash), {
      method: 'delete',
      status: 200,
      response,
    });
  },
  failure: emailHash => {
    moxios.stubRequest(join('/api/marketing/v1/subscriptions', emailHash), {
      method: 'delete',
      response: 'stub error',
      status: 404,
    });
  },
};
