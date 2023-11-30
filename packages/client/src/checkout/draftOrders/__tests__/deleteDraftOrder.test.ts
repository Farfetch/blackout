import * as checkoutClient from '../../index.js';
import { draftOrderId } from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteDraftOrder.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';
import type { DraftOrder } from '../types/index.js';

describe('checkout client', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('deleteDraftOrder', () => {
    const spy = jest.spyOn(client, 'delete');
    const expectedConfig = undefined;
    const id: DraftOrder['id'] = draftOrderId;

    const urlToBeCalled = `/checkout/v1/draftOrders/${id}`;

    it('should handle a client request successfully', async () => {
      const response = 204;

      mswServer.use(fixtures.success());

      await expect(checkoutClient.deleteDraftOrder(id)).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.deleteDraftOrder(id),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
