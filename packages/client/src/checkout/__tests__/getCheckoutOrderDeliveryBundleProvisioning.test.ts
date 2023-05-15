import * as checkoutClient from '../index.js';
import { deliveryBundleId, id } from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrderDeliveryBundleProvisioning.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { CheckoutOrderItemDeliveryProvisioning } from '../types/index.js';

describe('getCheckoutOrderDeliveryBundleProvisioning', () => {
  beforeEach(() => jest.clearAllMocks());

  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/itemDeliveryProvisioning`;

  it('should handle a client request successfully', async () => {
    const response: CheckoutOrderItemDeliveryProvisioning[] = [
      {
        itemId: 0,
        provisioning: [
          {
            merchantId: 0,
            merchantLocationId: 0,
            quantity: 0,
            deliveryDateEstimateMinimum: '2021-07-22T10:26:34.050Z',
            deliveryDateEstimateMaximum: '2021-07-22T10:26:34.050Z',
            deliveryDateEstimate: '2021-07-22T10:26:34.050Z',
          },
        ],
      },
    ];

    mswServer.use(fixtures.success(response));

    await expect(
      checkoutClient.getCheckoutOrderDeliveryBundleProvisioning(
        id,
        deliveryBundleId,
      ),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      checkoutClient.getCheckoutOrderDeliveryBundleProvisioning(
        id,
        deliveryBundleId,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
