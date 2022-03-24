import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (userId, personalId, response) => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, 'personalIds/', personalId),
      {
        method: 'get',
        response: response,
        status: 200,
      },
    );
  },
  failure: (userId, personalId) => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, 'personalIds/', personalId),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
