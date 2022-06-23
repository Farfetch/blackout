import join from 'proper-url-join';
import moxios from 'moxios';
import type { GetPredictionsQuery, Prediction } from '../types';

const getReqUrl = (params: {
  text: string;
  query?: GetPredictionsQuery;
}): string =>
  join('/api/account/v1/addressesprediction/', params.text, {
    query: params.query,
  });

export default {
  success: (params: {
    text: string;
    query?: GetPredictionsQuery;
    response: Prediction[];
  }): void => {
    moxios.stubRequest(getReqUrl(params), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { text: string; query: GetPredictionsQuery }): void => {
    moxios.stubRequest(getReqUrl(params), {
      response: 'stub error',
      status: 404,
    });
  },
};
