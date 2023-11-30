import { mockDraftOrders } from 'tests/__fixtures__/checkout/postDraftOrders.fixtures.mjs';
import { postDraftOrders } from '../index.js';
import { type PostDraftOrdersData } from '../types/index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postDraftsOrders.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('creates a new draftOrders', () => {
  const data: PostDraftOrdersData = {
    orderId: 123456789,
    customerId: 123,
  };
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('postDraftOrders', () => {
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = '/checkout/v1/draftOrders';

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockDraftOrders));

      await expect(postDraftOrders(data)).resolves.toMatchObject(
        mockDraftOrders,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(postDraftOrders(data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
