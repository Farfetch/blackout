import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    userId: number;
    attributeId: string;
    response: number;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users/',
        params.userId,
        '/attributes/',
        params.attributeId,
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number; attributeId: string }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users/',
        params.userId,
        '/attributes/',
        params.attributeId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
