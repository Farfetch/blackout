import * as checkoutClient from '../../index.js';
import {
  draftOrderId,
  mockDraftOrdersQuery as query,
  mockDraftOrderResponse as response,
} from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getDraftOrder.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getDraftOrder', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/draftOrders/${draftOrderId}?customerId=${query.customerId}`;

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(
        checkoutClient.getDraftOrder(draftOrderId, query),
      ).resolves.toStrictEqual(response);

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.getDraftOrder(draftOrderId, query),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
