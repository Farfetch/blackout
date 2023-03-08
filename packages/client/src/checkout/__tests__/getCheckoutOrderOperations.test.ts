import * as checkoutClient from '../index.js';
import { id } from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrderOperations.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('checkout client', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutOrderOperations', () => {
    const expectedUrl = `/checkout/v1/orders/${id}/operations`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'get');
    const query = {};
    const response = { entries: [], number: 1, totalItems: 1, totalPages: 1 };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(
        checkoutClient.getCheckoutOrderOperations(id, query),
      ).resolves.toEqual(response);
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.getCheckoutOrderOperations(id, query),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
