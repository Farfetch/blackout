import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: { userId: number; contactId: string }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'contacts',
        params.contactId,
      ),
      {
        status: 204,
      },
    );
  },
  failure: (params: { userId: number; contactId: string }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/users',
        params.userId,
        'contacts',
        params.contactId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
