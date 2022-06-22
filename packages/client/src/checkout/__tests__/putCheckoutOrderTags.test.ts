import * as checkoutClient from '..';
import { GetCheckoutOrderResponse, OrderStatusError } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putCheckoutOrderTags.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  const id = 123456;
  const data = ['string'];
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('putCheckoutOrderTags', () => {
    const spy = jest.spyOn(client, 'put');
    const urlToBeCalled = `/checkout/v1/orders/${id}/tags`;

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutOrderResponse = {
        id: 123,
        orderStatus: OrderStatusError.NoError,
      };

      mswServer.use(fixtures.success(response));

      expect.assertions(2);
      await expect(
        checkoutClient.putCheckoutOrderTags(id, data),
      ).resolves.toStrictEqual(response);

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        checkoutClient.putCheckoutOrderTags(id, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
