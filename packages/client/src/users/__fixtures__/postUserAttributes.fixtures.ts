import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';
import type { UserAttributesResponse } from '../types';

export default {
  success: (params: {
    userId: number;
    response: UserAttributesResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, 'attributes'),
      {
        response: get(params, 'response'),
        status: 200,
      },
    );
  },
  failure: (params: { userId: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, 'attributes'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
