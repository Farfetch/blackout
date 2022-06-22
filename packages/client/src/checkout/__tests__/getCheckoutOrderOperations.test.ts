import * as checkoutClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCheckoutOrderOperations.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutOrderOperations', () => {
    const id = 123456;
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
      expect(getSpy).toBeCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        checkoutClient.getCheckoutOrderOperations(id, query),
      ).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
