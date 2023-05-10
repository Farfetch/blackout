import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: ({ id, emailHash, packageList }, response) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', {
        query: { id, emailHash, package: packageList },
      }),
      {
        method: 'delete',
        status: 200,
        response,
      },
    );
  },
  failure: ({ id, emailHash, packageList }) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', {
        query: { id, emailHash, package: packageList },
      }),
      {
        method: 'delete',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
