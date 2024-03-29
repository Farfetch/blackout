import * as checkoutClient from '../index.js';
import {
  id,
  mockResponsePatchOrderItemsGiftMessage,
} from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchCheckoutOrderItems.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { PatchCheckoutOrderItemsData } from '../types/index.js';

describe('checkout client', () => {
  const expectedConfig = undefined;
  const data: PatchCheckoutOrderItemsData =
    mockResponsePatchOrderItemsGiftMessage;

  beforeEach(() => jest.clearAllMocks());

  describe('patchCheckoutOrderItems', () => {
    const spy = jest.spyOn(client, 'patch');
    const urlToBeCalled = `/checkout/v1/orders/${id}/items`;

    it('should handle a client request successfully', async () => {
      const response = 204;

      mswServer.use(fixtures.success());

      await expect(
        checkoutClient.patchCheckoutOrderItems(id, data),
      ).resolves.toStrictEqual(response);

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.patchCheckoutOrderItems(id, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
