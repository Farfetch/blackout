import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: userId => {
    moxios.stubRequest(join('/api/account/v1/users/', userId, '/preferences'), {
      method: 'put',
      status: 200,
    });
  },
  failure: userId => {
    moxios.stubRequest(join('/api/account/v1/users/', userId, '/preferences'), {
      method: 'put',
      response: 'stub error',
      status: 404,
    });
  },
};
