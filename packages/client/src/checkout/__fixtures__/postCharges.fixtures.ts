import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  CheckoutOrder,
  GetCheckoutOrderChargeResponse,
  PostChargesData,
} from '../types';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    data: PostChargesData;
    response: GetCheckoutOrderChargeResponse;
  }): void => {
    moxios.stubRequest(join('/api/checkout/v1/orders', params.id, 'charges'), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: {
    id: CheckoutOrder['id'];
    data: PostChargesData;
  }): void => {
    moxios.stubRequest(join('/api/checkout/v1/orders', params.id, 'charges'), {
      response: 'stub error',
      status: 404,
    });
  },
};
