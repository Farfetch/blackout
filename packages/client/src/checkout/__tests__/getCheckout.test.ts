import * as checkoutClient from '..';
import { GetCheckoutResponse, OrderStatusError } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCheckout.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  const id = 123456;
  const expectedConfig = undefined;
  const query = {};

  beforeEach(() => jest.clearAllMocks());

  describe('getCheckout', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}`;

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutResponse = {
        id: 123,
        orderStatus: OrderStatusError.NoError,
      };
      mswServer.use(fixtures.success(response));

      expect.assertions(2);
      await expect(
        checkoutClient.getCheckout(id, query),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        checkoutClient.getCheckout(id, query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
