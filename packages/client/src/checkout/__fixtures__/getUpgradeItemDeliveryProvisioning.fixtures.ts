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
    upgradeId: number;
    response: GetItemDeliveryProvisioningResponse;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'deliveryBundles',
        params.deliveryBundleId,
        'upgrades',
        params.upgradeId,
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
    upgradeId: number;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'deliveryBundles',
        params.deliveryBundleId,
        'upgrades',
        params.upgradeId,
        'itemDeliveryProvisioning',
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
