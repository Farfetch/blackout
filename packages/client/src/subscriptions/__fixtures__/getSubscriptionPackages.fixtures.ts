import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (query, response) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptionpackages', { query }),
      {
        method: 'get',
        status: 200,
        response,
      },
    );
  },
  failure: query => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptionpackages', { query }),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
