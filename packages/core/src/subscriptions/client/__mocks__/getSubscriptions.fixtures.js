import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (query, response) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', {
        query,
      }),
      {
        method: 'get',
        response,
        status: 200,
      },
    );
  },
  failure: query => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', {
        query,
      }),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
