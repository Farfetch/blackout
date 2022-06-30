import * as checkoutClient from '..';
import {
  id,
  mockResponsePatchOrderItemsGiftMessage,
} from 'tests/__fixtures__/checkout';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchCheckoutOrderItems.fixtures';
import mswServer from '../../../tests/mswServer';
import type { PatchCheckoutOrderItemsData } from '../types';

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

      expect.assertions(2);

      await expect(
        checkoutClient.patchCheckoutOrderItems(id, data),
      ).resolves.toStrictEqual(response);

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        checkoutClient.patchCheckoutOrderItems(id, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
