import join from 'proper-url-join';
import moxios from 'moxios';
import type { Address, User } from '../types';

export default {
  success: (params: { id: Address['id']; userId: User['id'] }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'addresses/preferred',
        params.id,
      ),
      {
        status: 204,
      },
    );
  },
  failure: (params: { id: Address['id']; userId: User['id'] }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'addresses/preferred',
        params.id,
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
