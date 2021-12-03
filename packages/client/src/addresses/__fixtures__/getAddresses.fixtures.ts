import moxios from 'moxios';
import type { Address, User } from '../types';

export default {
  success: (params: { userId: User['id']; response: Address[] }): void => {
    moxios.stubRequest(`/api/account/v1/users/${params.userId}/addresses`, {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { userId: User['id'] }): void => {
    moxios.stubRequest(`/api/account/v1/users/${params.userId}/addresses`, {
      response: 'stub error',
      status: 404,
    });
  },
};
