import * as checkoutClient from '..';
import {
  GetCheckoutResponse,
  OrderStatusError,
  PatchCheckoutData,
} from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchCheckout.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  const id = 123456;
  const data: PatchCheckoutData = {};
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('patchCheckout', () => {
    const spy = jest.spyOn(client, 'patch');
    const urlToBeCalled = `/checkout/v1/orders/${id}`;
    const response: GetCheckoutResponse = {
      id: 123,
      orderStatus: OrderStatusError.NoError,
    };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      expect.assertions(2);
      await expect(
        checkoutClient.patchCheckout(id, data),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should handle a client request successfully with config to apply the new axios headers', async () => {
      const configWithHeaders = {
        headers: {
          'Accept-Language': 'pt-PT',
          'FF-Country': 165,
          'FF-Currency': 'EUR',
        },
      };

      mswServer.use(fixtures.success(response));

      expect.assertions(2);
      await expect(
        checkoutClient.patchCheckout(id, data, configWithHeaders),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, configWithHeaders);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        checkoutClient.patchCheckout(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
