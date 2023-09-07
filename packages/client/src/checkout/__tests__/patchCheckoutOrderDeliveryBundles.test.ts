import * as checkoutClient from '../index.js';
import {
  checkoutOrderId,
  deliveryBundleId,
} from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchCheckoutOrderDeliveryBundles.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { PatchCheckoutOrderDeliveryBundlesData } from '../types/index.js';

describe('patchCheckoutOrderDeliveryBundles', () => {
  beforeEach(() => jest.clearAllMocks());

  const spy = jest.spyOn(client, 'patch');
  const expectedConfig = undefined;
  const data: PatchCheckoutOrderDeliveryBundlesData = [
    {
      op: 'replace',
      path: '/0/isSelected',
      value: 'true',
    },
  ];
  const urlToBeCalled = `/checkout/v1/orders/${checkoutOrderId}/deliveryBundles/${deliveryBundleId}`;

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(
      checkoutClient.patchCheckoutOrderDeliveryBundles(
        checkoutOrderId,
        deliveryBundleId,
        data,
      ),
    ).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      checkoutClient.patchCheckoutOrderDeliveryBundles(
        checkoutOrderId,
        deliveryBundleId,
        data,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
