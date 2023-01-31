import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (userId, attributeId, response) => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, '/attributes/', attributeId),
      {
        method: 'put',
        response: response,
        status: 200,
      },
    );
  },
  failure: (userId, attributeId) => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, '/attributes/', attributeId),
      {
        method: 'put',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
