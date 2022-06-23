import moxios from 'moxios';
import type { GetPredictionsQuery, Prediction } from '../types';

export default {
  withQuery: {
    success: (params: {
      predictionId: string;
      query?: GetPredictionsQuery;
      response: Prediction;
    }): void => {
      moxios.stubRequest(
        `/api/account/v1/addressesprediction/${params.predictionId}/address?sessionToken=${params?.query?.sessionToken}`,
        {
          response: params.response,
          status: 200,
        },
      );
    },
    failure: (params: {
      predictionId: string;
      query?: GetPredictionsQuery;
    }): void => {
      moxios.stubRequest(
        `/api/account/v1/addressesprediction/${params.predictionId}/address?sessionToken=${params?.query?.sessionToken}`,
        {
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
  withoutQuery: {
    success: (params: { predictionId: string; response: Prediction }): void => {
      moxios.stubRequest(
        `/api/account/v1/addressesprediction/${params?.predictionId}/address`,
        {
          response: params.response,
          status: 200,
        },
      );
    },
    failure: (params: { predictionId: string }): void => {
      moxios.stubRequest(
        `/api/account/v1/addressesprediction/${params?.predictionId}/address`,
        {
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
};
