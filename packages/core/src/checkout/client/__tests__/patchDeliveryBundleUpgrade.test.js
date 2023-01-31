import * as checkoutClient from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/patchDeliveryBundleUpgrade.fixtures';
import moxios from 'moxios';

describe('patchDeliveryBundleUpgrade', () => {
  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const spy = jest.spyOn(client, 'patch');
  const expectedConfig = undefined;
  const id = '123456';
  const deliveryBundleId = '3742-ds12-njnj-j21j';
  const upgradeId = '1234';
  const data = [
    {
      value: 'true',
    },
  ];

  const body = [
    {
      op: 'replace',
      path: '/isSelected',
      value: 'true',
    },
  ];
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades/${upgradeId}`;

  it('should handle a client request successfully', async () => {
    fixtures.success({
      id,
      deliveryBundleId,
      upgradeId,
    });

    expect.assertions(2);
    await expect(
      checkoutClient.patchDeliveryBundleUpgrade(
        id,
        deliveryBundleId,
        upgradeId,
        data,
      ),
    ).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, body, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id,
      deliveryBundleId,
      upgradeId,
    });

    expect.assertions(2);
    await expect(
      checkoutClient.patchDeliveryBundleUpgrade(
        id,
        deliveryBundleId,
        upgradeId,
        data,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, body, expectedConfig);
  });
});
