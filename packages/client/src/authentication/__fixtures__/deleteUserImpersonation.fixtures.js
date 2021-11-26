import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join('api/authentication/v1/userImpersonations/', params.id),
      {
        method: 'delete',
        status: 204,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('api/authentication/v1/userImpersonations/', params.id),
      {
        method: 'delete',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
