import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (userId, response) => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, 'personalIds/images'),
      {
        method: 'post',
        response: response,
        status: 200,
      },
    );
  },
  failure: userId => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, 'personalIds/images'),
      {
        method: 'post',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
