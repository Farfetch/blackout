import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (id, response) => {
    moxios.stubRequest(join('/api/account/v1/exchanges', id), {
      method: 'get',
      response: response,
      status: 200,
    });
  },
  failure: id => {
    moxios.stubRequest(join('/api/account/v1/exchanges', id), {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};
