import * as checkoutClient from '../index.js';
import {
  deliveryBundleId,
  id,
  upgradeId,
} from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrderDeliveryBundleUpgradeProvisioning.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { ItemDeliveryProvisioning } from '../types/index.js';

describe('getCheckoutOrderDeliveryBundleUpgradeProvisioning', () => {
  beforeEach(() => jest.clearAllMocks());

  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades/${upgradeId}/itemDeliveryProvisioning`;

  it('should handle a client request successfully', async () => {
    const response: ItemDeliveryProvisioning[] = [
      {
        itemId: 0,
        provisioning: [
          {
            merchantId: 0,
            merchantLocationId: 0,
            quantity: 0,
            deliveryDateEstimateMinimum: '2021-07-22T13:20:58.648Z',
            deliveryDateEstimateMaximum: '2021-07-22T13:20:58.648Z',
            deliveryDateEstimate: '2021-07-22T13:20:58.648Z',
          },
        ],
      },
    ];

    mswServer.use(fixtures.success(response));

    await expect(
      checkoutClient.getCheckoutOrderDeliveryBundleUpgradeProvisioning(
        id,
        deliveryBundleId,
        upgradeId,
      ),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      checkoutClient.getCheckoutOrderDeliveryBundleUpgradeProvisioning(
        id,
        deliveryBundleId,
        upgradeId,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
