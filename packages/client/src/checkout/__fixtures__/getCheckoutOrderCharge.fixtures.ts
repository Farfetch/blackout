import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  ChargeInstrument,
  CheckoutOrder,
  GetCheckoutOrderChargeResponse,
} from '../types';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    chargeId: ChargeInstrument['id'];
    response: GetCheckoutOrderChargeResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders', params.id, 'charges', params.chargeId),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    id: CheckoutOrder['id'];
    chargeId: ChargeInstrument['id'];
  }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders', params.id, 'charges', params.chargeId),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
