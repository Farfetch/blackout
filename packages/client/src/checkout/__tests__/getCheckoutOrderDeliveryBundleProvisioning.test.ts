import * as checkoutClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCheckoutOrderDeliveryBundleProvisioning.fixtures';
import mswServer from '../../../tests/mswServer';
import type { GetCheckoutOrderDeliveryBundleProvisioningResponse } from '../types';

describe('getCheckoutOrderDeliveryBundleProvisioning', () => {
  beforeEach(() => jest.clearAllMocks());

  const spy = jest.spyOn(client, 'get');
  const id = 123456;
  const expectedConfig = undefined;
  const deliveryBundleId = '12345';
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/itemDeliveryProvisioning`;

  it('should handle a client request successfully', async () => {
    const response: GetCheckoutOrderDeliveryBundleProvisioningResponse = [
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

    expect.assertions(2);

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

    expect.assertions(2);
    await expect(
      checkoutClient.getCheckoutOrderDeliveryBundleProvisioning(
        id,
        deliveryBundleId,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
