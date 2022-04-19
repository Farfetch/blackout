import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (id, pickupRescheduleId, response) => {
    moxios.stubRequest(
      join(
        '/api/account/v1/returns',
        id,
        '/pickupRescheduleRequests',
        pickupRescheduleId,
      ),
      {
        method: 'get',
        response: response,
        status: 200,
      },
    );
  },
  failure: (id, pickupRescheduleId) => {
    moxios.stubRequest(
      join(
        '/api/account/v1/returns',
        id,
        '/pickupRescheduleRequests',
        pickupRescheduleId,
      ),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
