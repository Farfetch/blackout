import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: ({ id, emailHash }, response) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', { query: { id, emailHash } }),
      {
        method: 'delete',
        status: 200,
        response,
      },
    );
  },
  failure: ({ id, emailHash }) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', { query: { id, emailHash } }),
      {
        method: 'delete',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
