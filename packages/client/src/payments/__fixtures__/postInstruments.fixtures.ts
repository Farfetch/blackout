import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  Intent,
  PostInstrumentsData,
  PostInstrumentsResponse,
} from '../types';

export default {
  success: (params: {
    id: Intent['id'];
    data: PostInstrumentsData;
    response: PostInstrumentsResponse;
  }): void => {
    moxios.stubRequest(
      join('api/payment/v1/intents', params.id, 'instruments'),
      {
        response: params.response.data,
        headers: params.response.headers,
        status: 201,
      },
    );
  },
  failure: (params: { id: Intent['id']; data: PostInstrumentsData }): void => {
    moxios.stubRequest(
      join('api/payment/v1/intents', params.id, 'instruments'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
