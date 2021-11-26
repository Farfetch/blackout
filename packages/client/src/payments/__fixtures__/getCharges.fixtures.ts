import join from 'proper-url-join';
import moxios from 'moxios';
import type { Charge, ChargeInstruments, Intent } from '../types';

export default {
  success: (params: {
    id: Intent['id'];
    chargeId: ChargeInstruments['id'];
    response: Charge;
  }): void => {
    moxios.stubRequest(
      join('api/payment/v1/intents', params.id, 'charges', params.chargeId),
      {
        response: params.response,
        status: 201,
      },
    );
  },
  failure: (params: {
    id: Intent['id'];
    chargeId: ChargeInstruments['id'];
  }): void => {
    moxios.stubRequest(
      join('api/payment/v1/intents', params.id, 'charges', params.chargeId),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
