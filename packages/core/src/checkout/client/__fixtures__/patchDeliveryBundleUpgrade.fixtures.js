import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'deliveryBundles',
        params.deliveryBundleId,
        'upgrades',
        params.upgradeId,
      ),
      {
        method: 'patch',
        status: 204,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'deliveryBundles',
        params.deliveryBundleId,
        'upgrades',
        params.upgradeId,
      ),
      {
        method: 'patch',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
