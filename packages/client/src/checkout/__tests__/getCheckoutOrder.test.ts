import * as checkoutClient from '../index.js';
import {
  type GetCheckoutOrderResponse,
  OrderStatusError,
} from '../types/index.js';
import { id } from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrder.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('checkout client', () => {
  const expectedConfig = undefined;
  const query = {};

  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutOrder', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}`;

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutOrderResponse = {
        id: 123,
        orderStatus: OrderStatusError.NoError,
      };

      mswServer.use(fixtures.success(response));

      await expect(
        checkoutClient.getCheckoutOrder(id, query),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.getCheckoutOrder(id, query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
