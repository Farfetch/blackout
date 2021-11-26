import * as checkoutClient from '..';
import { GetItemDeliveryProvisioningResponse } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getUpgradeItemDeliveryProvisioning.fixtures';
import moxios from 'moxios';

describe('getUpgradeItemDeliveryProvisioning', () => {
  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const spy = jest.spyOn(client, 'get');
  const id = 123456;
  const expectedConfig = undefined;
  const deliveryBundleId = '3742-ds12-njnj-j21j';
  const upgradeId = 123456;
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades/${upgradeId}/itemDeliveryProvisioning`;

  it('should handle a client request successfully', async () => {
    const response: GetItemDeliveryProvisioningResponse = [
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

    fixtures.success({
      id,
      deliveryBundleId,
      upgradeId,
      response,
    });

    expect.assertions(2);
    await expect(
      checkoutClient.getUpgradeItemDeliveryProvisioning(
        id,
        deliveryBundleId,
        upgradeId,
      ),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id,
      deliveryBundleId,
      upgradeId,
    });

    await expect(
      checkoutClient.getUpgradeItemDeliveryProvisioning(
        id,
        deliveryBundleId,
        upgradeId,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
