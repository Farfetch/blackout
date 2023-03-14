import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (id, bookRequestId, response) => {
    moxios.stubRequest(
      join('/api/account/v1/exchanges', id, '/bookRequests', bookRequestId),
      {
        method: 'get',
        response: response,
        status: 200,
      },
    );
  },
  failure: (id, bookRequestId) => {
    moxios.stubRequest(
      join('/api/account/v1/exchanges', id, '/bookRequests', bookRequestId),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
