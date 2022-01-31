import { getDesigners } from '../';
import { mockQuery, mockResponse } from 'tests/__fixtures__/designers';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getDesigners.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('designers client', () => {
  const expectedConfig = undefined;
  const query = mockQuery;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  describe('getDesigners()', () => {
    it('should handle a client request successfully', async () => {
      const response = mockResponse.result;

      mswServer.use(fixtures.success(response));
      expect.assertions(2);

      await expect(getDesigners(query)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        join('/legacy/v1/designers', { query }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());
      expect.assertions(2);

      await expect(getDesigners(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/legacy/v1/designers', { query }),
        expectedConfig,
      );
    });
  });
});
