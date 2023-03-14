import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (id, response) => {
    moxios.stubRequest(join('/api/account/v1/exchanges', id, '/bookRequests'), {
      method: 'post',
      response: response,
      status: 202,
    });
  },
  failure: id => {
    moxios.stubRequest(join('/api/account/v1/exchanges', id, '/bookRequests'), {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
