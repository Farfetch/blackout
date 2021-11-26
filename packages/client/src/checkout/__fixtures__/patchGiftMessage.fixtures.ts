import { CheckoutOrder, PatchGiftMessageData } from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    data: PatchGiftMessageData;
  }): void => {
    moxios.stubRequest(join('/api/checkout/v1/orders/', params.id, 'items'), {
      status: 204,
    });
  },
  failure: (params: {
    id: CheckoutOrder['id'];
    data: PatchGiftMessageData;
  }): void => {
    moxios.stubRequest(join('/api/checkout/v1/orders/', params.id, 'items'), {
      response: 'stub error',
      status: 404,
    });
  },
};
