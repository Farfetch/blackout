import join from 'proper-url-join';
import moxios from 'moxios';
import type { Instrument, Intent } from '../types';

export default {
  success: (params: {
    id: Intent['id'];
    instrumentId: Instrument['id'];
    response: Instrument;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/payment/v1/intents',
        params.id,
        'instruments',
        params.instrumentId,
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    id: Intent['id'];
    instrumentId: Instrument['id'];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/payment/v1/intents',
        params.id,
        'instruments',
        params.instrumentId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
