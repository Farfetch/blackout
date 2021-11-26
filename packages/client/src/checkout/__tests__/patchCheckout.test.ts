import * as checkoutClient from '..';
import {
  GetCheckoutResponse,
  OrderStatusError,
  PatchCheckoutData,
} from '../types';
import client from '../../helpers/client';
import fixture from '../__fixtures__/patchCheckout.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = 123456;
  const data: PatchCheckoutData = {};
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('patchCheckout', () => {
    const spy = jest.spyOn(client, 'patch');
    const urlToBeCalled = `/checkout/v1/orders/${id}`;
    const response: GetCheckoutResponse = {
      id: 123,
      orderStatus: OrderStatusError.NoError,
    };

    it('should handle a client request successfully', async () => {
      fixture.success({ id, data, response });

      expect.assertions(2);
      await expect(checkoutClient.patchCheckout(id, data)).resolves.toBe(
        response,
      );
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

      fixture.success({ id, data, response });

      expect.assertions(2);
      await expect(
        checkoutClient.patchCheckout(id, data, configWithHeaders),
      ).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, configWithHeaders);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, data });

      expect.assertions(2);
      await expect(
        checkoutClient.patchCheckout(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
