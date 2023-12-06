import * as checkoutClient from '../../index.js';
import { mockDraftOrderResponse } from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postDraftsOrders.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';
import type { DraftOrder, PostDraftOrderData } from '../types/index.js';

describe('checkout client', () => {
  const data: PostDraftOrderData = {
    orderId: 12343243,
    customerId: '123',
  };
  const response: DraftOrder = mockDraftOrderResponse;
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('postDraftOrder', () => {
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = '/checkout/v1/draftOrders';

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(checkoutClient.postDraftOrder(data)).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.postDraftOrder(data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
