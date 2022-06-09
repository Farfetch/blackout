import client from '../../helpers/client';
import fixtures from '../__fixtures__/getOperation.fixtures';
import getOperation from '../getOperation';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getOperation', () => {
    const orderId = 123456;
    const operationId = '987654321';
    const params = { orderId, operationId };
    const expectedUrl = `/checkout/v1/orders/${orderId}/operations/${operationId}`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'get');
    const response = { id: operationId };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(getOperation(params)).resolves.toEqual(response);
      expect(getSpy).toBeCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);
      await expect(getOperation(params)).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
