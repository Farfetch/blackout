import * as checkoutClient from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getDeliveryBundleUpgrades.fixtures';
import moxios from 'moxios';

describe('getDeliveryBundleUpgrades', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const id = '123456';
  const deliveryBundleId = '3742-ds12-njnj-j21j';
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({
      id,
      deliveryBundleId,
      response,
    });

    expect.assertions(2);
    await expect(
      checkoutClient.getDeliveryBundleUpgrades(id, deliveryBundleId),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id,
      deliveryBundleId,
    });

    expect.assertions(2);
    await expect(
      checkoutClient.getDeliveryBundleUpgrades(id, deliveryBundleId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
