import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: { userId: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params.userId, '/preferences'),
      {
        status: 200,
      },
    );
  },
  failure: (params: { userId: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params.userId, '/preferences'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
