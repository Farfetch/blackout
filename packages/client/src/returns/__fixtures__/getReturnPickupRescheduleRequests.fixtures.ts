import join from 'proper-url-join';
import moxios from 'moxios';
import type { PickupRescheduleRequests } from '../types';

export default {
  success: (params: {
    id: string;
    response: PickupRescheduleRequests;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', params.id, 'pickupRescheduleRequests/'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: string }): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', params.id, 'pickupRescheduleRequests/'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
