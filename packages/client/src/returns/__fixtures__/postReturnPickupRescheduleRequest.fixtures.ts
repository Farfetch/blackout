import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: { id: string; response: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', params.id, 'pickupRescheduleRequests/'),
      {
        response: params.response,
        status: 202,
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
