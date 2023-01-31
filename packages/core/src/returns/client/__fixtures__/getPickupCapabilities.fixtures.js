import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  accsvc: {
    success: params => {
      moxios.stubRequest(
        join(
          '/api/account/v1/returns',
          params.id,
          'pickupcapabilities/',
          params.pickupDay,
        ),
        {
          method: 'get',
          response: params.response,
          status: 200,
        },
      );
    },
    failure: params => {
      moxios.stubRequest(
        join(
          '/api/account/v1/returns',
          params.id,
          'pickupcapabilities/',
          params.pickupDay,
        ),
        {
          method: 'get',
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
  legacy: {
    success: params => {
      moxios.stubRequest(
        join('/api/legacy/v1/returns', params.id, 'pickupcapabilities/', {
          query: { pickupDay: params.parsedPickupDay },
        }),
        {
          method: 'get',
          response: params.response,
          status: 200,
        },
      );
    },
    failure: params => {
      moxios.stubRequest(
        join('/api/legacy/v1/returns', params.id, 'pickupcapabilities/', {
          query: { pickupDay: params.parsedPickupDay },
        }),
        {
          method: 'get',
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
};
