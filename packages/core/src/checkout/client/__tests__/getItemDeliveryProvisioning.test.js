import * as checkoutClient from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getItemDeliveryProvisioning.fixtures';
import moxios from 'moxios';

describe('getItemDeliveryProvisioning', () => {
  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const expectedConfig = undefined;
  const deliveryBundleId = 12345;
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/itemDeliveryProvisioning`;

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ id, deliveryBundleId, response });

    expect.assertions(2);
    await expect(
      checkoutClient.getItemDeliveryProvisioning(id, deliveryBundleId),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id, deliveryBundleId });

    expect.assertions(2);
    await expect(
      checkoutClient.getItemDeliveryProvisioning(id, deliveryBundleId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
