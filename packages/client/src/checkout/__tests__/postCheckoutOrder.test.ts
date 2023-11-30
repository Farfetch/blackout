import * as checkoutClient from '../index.js';
import {
  type GetCheckoutOrderResponse,
  OrderStatusError,
  type PostCheckoutOrderDataWithBag,
  type PostCheckoutOrderDataWithDraftOrder,
  ShippingMode,
} from '../types/index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postCheckoutOrder.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('checkout client', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('PostCheckoutOrderDataWithBag', () => {
    const data: PostCheckoutOrderDataWithBag = {
      bagId: '25cfbb10-f4d1-4684-8e52-45e4d3b001d3',
      guestUserEmail: 'test-email@acme.com',
      shippingMode: ShippingMode.ByMerchant,
      metadata: {
        someKey: 'someValue',
        anotherKey: 'anotherValue',
      },
    };
    const expectedConfig = undefined;

    describe('postCheckoutOrder', () => {
      const spy = jest.spyOn(client, 'post');
      const urlToBeCalled = '/checkout/v1/orders';

      it('should handle a client request successfully', async () => {
        const response: GetCheckoutOrderResponse = {
          id: 123,
          orderStatus: OrderStatusError.NoError,
        };

        mswServer.use(fixtures.success(response));

        await expect(
          checkoutClient.postCheckoutOrder(data),
        ).resolves.toStrictEqual(response);
        expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
      });

      it('should receive a client request error', async () => {
        mswServer.use(fixtures.failure());

        await expect(
          checkoutClient.postCheckoutOrder(data),
        ).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
      });
    });
  });

  describe('PostCheckoutOrderDataWithDraftOrder', () => {
    const data: PostCheckoutOrderDataWithDraftOrder = {
      draftOrderId: '123',
    };
    const expectedConfig = undefined;

    describe('postCheckoutOrder', () => {
      const spy = jest.spyOn(client, 'post');
      const urlToBeCalled = '/checkout/v1/orders';

      it('should handle a client request successfully', async () => {
        const response: GetCheckoutOrderResponse = {
          id: 123,
          orderStatus: OrderStatusError.NoError,
        };

        mswServer.use(fixtures.success(response));

        await expect(
          checkoutClient.postCheckoutOrder(data),
        ).resolves.toStrictEqual(response);
        expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
      });

      it('should receive a client request error', async () => {
        mswServer.use(fixtures.failure());

        await expect(
          checkoutClient.postCheckoutOrder(data),
        ).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
      });
    });
  });
});
