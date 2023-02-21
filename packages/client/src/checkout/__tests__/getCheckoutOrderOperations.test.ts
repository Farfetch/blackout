import * as checkoutClient from '..';
import { id } from 'tests/__fixtures__/checkout';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCheckoutOrderOperations.fixtures';
import mswServer from '../../../tests/mswServer';

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
