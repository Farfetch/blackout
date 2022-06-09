import * as checkoutClient from '..';
import {
  GetCheckoutResponse,
  OrderStatusError,
  PostCheckoutData,
  ShippingMode,
} from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postCheckout.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  const data: PostCheckoutData = {
    bagId: '25cfbb10-f4d1-4684-8e52-45e4d3b001d3',
    guestUserEmail: 'test-email@acme.com',
    usePaymentIntent: true,
    shippingMode: ShippingMode.ByMerchant,
  };
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('postCheckout', () => {
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = '/checkout/v1/orders';

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutResponse = {
        id: 123,
        orderStatus: OrderStatusError.NoError,
      };

      mswServer.use(fixtures.success(response));

      expect.assertions(2);
      await expect(checkoutClient.postCheckout(data)).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);
      await expect(checkoutClient.postCheckout(data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
