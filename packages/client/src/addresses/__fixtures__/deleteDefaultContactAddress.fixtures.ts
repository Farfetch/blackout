import join from 'proper-url-join';
import moxios from 'moxios';
import type { User } from '../types';

export default {
  success: (params: { userId: User['id'] }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'addresses/preferred/current',
      ),
      {
        status: 204,
      },
    );
  },
  failure: (params: { userId: User['id'] }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'addresses/preferred/current',
      ),
      {
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
