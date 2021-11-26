import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'addresses/preferred/current',
      ),
      {
        method: 'get',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'addresses/preferred/current',
      ),
      {
        method: 'get',
        response: {
          errors: [
            {
              code: 0,
              message: 'error',
              developerMessage: 'This is developer message',
              moreInformation: 'Error more information',
              exception: {},
            },
          ],
        },
        status: 400,
      },
    );
  },
};
