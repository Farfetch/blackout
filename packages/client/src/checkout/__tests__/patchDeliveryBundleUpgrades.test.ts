import * as checkoutClient from '..';
import {
  DeliveryBundleUpgradesOperation,
  PatchDeliveryBundleUpgradesData,
} from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchDeliveryBundleUpgrades.fixtures';
import mswServer from '../../../tests/mswServer';

describe('patchDeliveryBundleUpgrades', () => {
  beforeEach(() => jest.clearAllMocks());

  const spy = jest.spyOn(client, 'patch');
  const expectedConfig = undefined;
  const id = 123456;
  const deliveryBundleId = '3742-ds12-njnj-j21j';
  const upgradeId = '1234';
  const data: PatchDeliveryBundleUpgradesData = [
    {
      op: DeliveryBundleUpgradesOperation.replace,
      path: '/0/isSelected',
      value: 'true',
    },
    {
      op: DeliveryBundleUpgradesOperation.test,
      path: '/0/id',
      value: upgradeId,
    },
  ];
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades`;

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);
    await expect(
      checkoutClient.patchDeliveryBundleUpgrades(id, deliveryBundleId, data),
    ).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(
      checkoutClient.patchDeliveryBundleUpgrades(id, deliveryBundleId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
