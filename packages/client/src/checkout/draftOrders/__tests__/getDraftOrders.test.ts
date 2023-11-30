import * as checkoutClient from '../../index.js';
import {
  mockDraftOrdersQuery as query,
  mockDraftOrdersResponse as response,
} from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getDraftOrders.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getDraftOrders', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/draftOrders?customerId=${query.customerId}`;

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(checkoutClient.getDraftOrders(query)).resolves.toStrictEqual(
        response,
      );

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.getDraftOrders(query),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
