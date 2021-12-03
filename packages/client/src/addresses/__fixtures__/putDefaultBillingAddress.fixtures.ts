import moxios from 'moxios';
import type { Address, User } from '../types';

export default {
  success: (params: { id: Address['id']; userId: User['id'] }): void => {
    moxios.stubRequest(
      `/api/account/v1/users/${params.userId}/addresses/billing/${params.id}`,
      {
        status: 200,
      },
    );
  },
  failure: (params: { id: Address['id']; userId: User['id'] }): void => {
    moxios.stubRequest(
      `/api/account/v1/users/${params.userId}/addresses/billing/${params.id}`,
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
