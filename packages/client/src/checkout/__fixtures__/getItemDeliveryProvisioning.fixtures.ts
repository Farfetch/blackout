import {
  CheckoutOrder,
  DeliveryBundle,
  GetItemDeliveryProvisioningResponse,
} from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    deliveryBundleId: DeliveryBundle['id'];
    response: GetItemDeliveryProvisioningResponse;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'deliveryBundles',
        params.deliveryBundleId,
        'itemDeliveryProvisioning',
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    id: CheckoutOrder['id'];
    deliveryBundleId: DeliveryBundle['id'];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'deliveryBundles',
        params.deliveryBundleId,
        'itemDeliveryProvisioning',
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
