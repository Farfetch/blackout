import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (userId, attributeId) => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, '/attributes/', attributeId),
      {
        method: 'delete',
        status: 200,
      },
    );
  },
  failure: (userId, attributeId) => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, '/attributes/', attributeId),
      {
        method: 'delete',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
