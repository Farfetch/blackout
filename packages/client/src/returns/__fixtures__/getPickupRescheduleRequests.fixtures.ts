import join from 'proper-url-join';
import moxios from 'moxios';
import type { PickupRescheduleRequests } from '../types';

export default {
  success: (id: string, response: PickupRescheduleRequests): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', id, 'pickupRescheduleRequests/'),
      {
        response: response,
        status: 200,
      },
    );
  },
  failure: (id: string): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', id, 'pickupRescheduleRequests/'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
