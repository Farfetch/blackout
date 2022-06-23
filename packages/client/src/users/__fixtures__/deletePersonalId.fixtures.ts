import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    userId: number;
    personalId: string;
    response: number;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'personalIds/',
        params.personalId,
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number; personalId: string }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'personalIds/',
        params.personalId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
