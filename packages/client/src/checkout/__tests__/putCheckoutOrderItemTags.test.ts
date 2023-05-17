import * as checkoutClient from '../index.js';
import {
  type GetCheckoutOrderResponse,
  OrderStatusError,
} from '../types/index.js';
import { id, itemId } from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/putCheckoutOrderItemTags.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('checkout client', () => {
  const data = ['string'];
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('putCheckoutOrderItemTags', () => {
    const spy = jest.spyOn(client, 'put');
    const urlToBeCalled = `/checkout/v1/orders/${id}/items/${itemId}/tags`;

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutOrderResponse = {
        id: 123,
        orderStatus: OrderStatusError.NoError,
      };

      mswServer.use(fixtures.success(response));

      await expect(
        checkoutClient.putCheckoutOrderItemTags(id, itemId, data),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.putCheckoutOrderItemTags(id, itemId, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
