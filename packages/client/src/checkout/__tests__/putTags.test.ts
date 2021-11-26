import * as checkoutClient from '..';
import { GetCheckoutResponse, OrderStatusError } from '../types';
import client from '../../helpers/client';
import fixture from '../__fixtures__/putTags.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = 123456;
  const data = ['string'];
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('putTags', () => {
    const spy = jest.spyOn(client, 'put');
    const urlToBeCalled = `/checkout/v1/orders/${id}/tags`;

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutResponse = {
        id: 123,
        orderStatus: OrderStatusError.NoError,
      };

      fixture.success({ id, data, response });

      expect.assertions(2);
      await expect(checkoutClient.putTags(id, data)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, data });

      expect.assertions(2);
      await expect(checkoutClient.putTags(id, data)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
