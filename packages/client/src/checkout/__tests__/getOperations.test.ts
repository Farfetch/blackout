import client from '../../helpers/client';
import fixture from '../__fixtures__/getOperations.fixture';
import getOperations from '../getOperations';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getOperations', () => {
    const id = 123456;
    const expectedUrl = `/checkout/v1/orders/${id}/operations`;
    const expectedConfig = undefined;
    const getSpy = jest.spyOn(client, 'get');
    const query = {};
    const response = { entries: [], number: 1, totalItems: 1, totalPages: 1 };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixture.success({ id, query, response }));

      await expect(getOperations(id, query)).resolves.toEqual(response);
      expect(getSpy).toBeCalledWith(expectedUrl, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixture.failure({ id, query }));

      expect.assertions(2);
      await expect(getOperations(id, query)).rejects.toMatchSnapshot();
      expect(getSpy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    });
  });
});
