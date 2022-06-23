import join from 'proper-url-join';
import moxios from 'moxios';
import type { ContactResponse } from '../types';

export default {
  success: (params: { userId: number; response: ContactResponse }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, 'contacts'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, 'contacts'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
