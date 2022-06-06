import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (id: string, response: number): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', id, 'pickupRescheduleRequests/'),
      {
        response: response,
        status: 202,
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
