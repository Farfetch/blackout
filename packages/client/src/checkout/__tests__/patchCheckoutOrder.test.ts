import * as checkoutClient from '..';
import {
  GetCheckoutOrderResponse,
  OrderStatusError,
  PatchCheckoutOrderData,
} from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchCheckoutOrder.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  const id = 123456;
  const data: PatchCheckoutOrderData = {};
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('patchCheckoutOrder', () => {
    const spy = jest.spyOn(client, 'patch');
    const urlToBeCalled = `/checkout/v1/orders/${id}`;
    const response: GetCheckoutOrderResponse = {
      id: 123,
      orderStatus: OrderStatusError.NoError,
    };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      expect.assertions(2);
      await expect(
        checkoutClient.patchCheckoutOrder(id, data),
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
        checkoutClient.patchCheckoutOrder(id, data, configWithHeaders),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, configWithHeaders);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        checkoutClient.patchCheckoutOrder(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
