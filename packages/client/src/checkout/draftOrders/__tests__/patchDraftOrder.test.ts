import * as checkoutClient from '../../index.js';
import { draftOrderId } from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchDraftOrder.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';
import type { DraftOrder, DraftOrderData } from '../types/index.js';

describe('checkout client', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('patchDraftOrder', () => {
    const spy = jest.spyOn(client, 'patch');
    const expectedConfig = undefined;
    const id: DraftOrder['id'] = draftOrderId;

    const data: DraftOrderData = {
      metadata: {
        message: 'Some engraved message within the product',
      },
    };
    const urlToBeCalled = `/checkout/v1/draftOrders/${id}`;

    it('should handle a client request successfully', async () => {
      const response = 204;

      mswServer.use(fixtures.success());

      await expect(
        checkoutClient.patchDraftOrder(id, data),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.patchDraftOrder(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
