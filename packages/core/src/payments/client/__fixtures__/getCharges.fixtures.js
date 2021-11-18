import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join(
        'api/payment/v1/intents',
        params.intentId,
        'charges',
        params.chargeId,
      ),
      {
        method: 'get',
        response: params.response,
        status: 201,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join(
        'api/payment/v1/intents',
        params.intentId,
        'charges',
        params.chargeId,
      ),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
