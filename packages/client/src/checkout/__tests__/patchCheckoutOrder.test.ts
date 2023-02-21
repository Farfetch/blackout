import * as checkoutClient from '..';
import {
  type GetCheckoutOrderResponse,
  OrderStatusError,
  type PatchCheckoutOrderData,
} from '../types';
import { id } from 'tests/__fixtures__/checkout';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchCheckoutOrder.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
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

      await expect(
        checkoutClient.patchCheckoutOrder(id, data, configWithHeaders),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, configWithHeaders);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.patchCheckoutOrder(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
