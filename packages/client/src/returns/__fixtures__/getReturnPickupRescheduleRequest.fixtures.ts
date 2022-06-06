import join from 'proper-url-join';
import moxios from 'moxios';
import type { PickupRescheduleRequest } from '../types';

export default {
  success: (
    id: string,
    rescheduleRequestId: string,
    response: PickupRescheduleRequest,
  ): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/returns',
        id,
        'pickupRescheduleRequests/',
        rescheduleRequestId,
      ),
      {
        response: response,
        status: 200,
      },
    );
  },
  failure: (id: string, rescheduleRequestId: string): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/returns',
        id,
        'pickupRescheduleRequests/',
        rescheduleRequestId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
