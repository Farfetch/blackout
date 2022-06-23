import join from 'proper-url-join';
import moxios from 'moxios';
import type { PickupRescheduleRequest } from '../types';

export default {
  success: (params: {
    id: string;
    rescheduleRequestId: string;
    response: PickupRescheduleRequest;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/returns',
        params.id,
        'pickupRescheduleRequests/',
        params.rescheduleRequestId,
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: string; rescheduleRequestId: string }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/returns',
        params.id,
        'pickupRescheduleRequests/',
        params.rescheduleRequestId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
