import * as checkoutClient from '..';
import { GetCheckoutOrderResponse, OrderStatusError } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putCheckoutOrderPromocode.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  const id = 123456;
  const data = { promocode: 'string' };
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('putCheckoutOrderPromocode', () => {
    const spy = jest.spyOn(client, 'put');
    const urlToBeCalled = `/checkout/v1/orders/${id}/promocodes`;

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutOrderResponse = {
        id: 123,
        orderStatus: OrderStatusError.NoError,
      };

      mswServer.use(fixtures.success(response));

      expect.assertions(2);
      await expect(
        checkoutClient.putCheckoutOrderPromocode(id, data),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);
      await expect(
        checkoutClient.putCheckoutOrderPromocode(id, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
