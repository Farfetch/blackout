import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (userId, personalId, response) => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, 'personalIds/', personalId),
      {
        method: 'delete',
        response: response,
        status: 204,
      },
    );
  },
  failure: (userId, personalId) => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, 'personalIds/', personalId),
      {
        method: 'delete',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
