import moxios from 'moxios';

export default {
  withQuery: {
    success: ({ predictionId, query, response }) => {
      moxios.stubRequest(
        `/api/account/v1/addressesprediction/${predictionId}/address?sessionToken=${query.sessionToken}`,
        {
          method: 'get',
          response: response,
          status: 200,
        },
      );
    },
    failure: ({ predictionId, query }) => {
      moxios.stubRequest(
        `/api/account/v1/addressesprediction/${predictionId}/address?sessionToken=${query.sessionToken}`,
        {
          method: 'get',
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
  withoutQuery: {
    success: ({ predictionId, response }) => {
      moxios.stubRequest(
        `/api/account/v1/addressesprediction/${predictionId}/address`,
        {
          method: 'get',
          response: response,
          status: 200,
        },
      );
    },
    failure: ({ predictionId }) => {
      moxios.stubRequest(
        `/api/account/v1/addressesprediction/${predictionId}/address`,
        {
          method: 'get',
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
};
