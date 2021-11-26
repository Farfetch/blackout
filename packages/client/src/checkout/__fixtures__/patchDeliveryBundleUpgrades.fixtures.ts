import {
  CheckoutOrder,
  DeliveryBundle,
  PatchDeliveryBundleUpgradesData,
} from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    deliveryBundleId: DeliveryBundle['id'];
    data: PatchDeliveryBundleUpgradesData;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'deliveryBundles',
        params.deliveryBundleId,
        'upgrades',
      ),
      {
        status: 204,
      },
    );
  },
  failure: (params: {
    id: CheckoutOrder['id'];
    deliveryBundleId: DeliveryBundle['id'];
    data: PatchDeliveryBundleUpgradesData;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'deliveryBundles',
        params.deliveryBundleId,
        'upgrades',
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
