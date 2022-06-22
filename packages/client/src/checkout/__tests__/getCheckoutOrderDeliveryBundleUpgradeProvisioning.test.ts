import * as checkoutClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCheckoutOrderDeliveryBundleUpgradeProvisioning.fixtures';
import mswServer from '../../../tests/mswServer';
import type { GetCheckoutOrderDeliveryBundleUpgradeProvisioningResponse } from '../types';

describe('getCheckoutOrderDeliveryBundleUpgradeProvisioning', () => {
  beforeEach(() => jest.clearAllMocks());

  const spy = jest.spyOn(client, 'get');
  const id = 123456;
  const expectedConfig = undefined;
  const deliveryBundleId = '3742-ds12-njnj-j21j';
  const upgradeId = '123456';
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades/${upgradeId}/itemDeliveryProvisioning`;

  it('should handle a client request successfully', async () => {
    const response: GetCheckoutOrderDeliveryBundleUpgradeProvisioningResponse =
      [
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

    expect.assertions(2);
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
