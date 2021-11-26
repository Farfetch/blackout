import * as checkoutClient from '..';
import { GetCheckoutResponse, OrderStatusError } from '../types';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getCheckout.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = 123456;
  const expectedConfig = undefined;
  const query = {};

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getCheckout', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}`;

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutResponse = {
        id: 123,
        orderStatus: OrderStatusError.NoError,
      };
      fixture.success({ id, response, query });

      expect.assertions(2);
      await expect(checkoutClient.getCheckout(id, query)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, query });

      expect.assertions(2);
      await expect(
        checkoutClient.getCheckout(id, query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
