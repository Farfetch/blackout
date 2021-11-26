import { getDesigners } from '../';
import { mockQuery, mockResponse } from 'tests/__fixtures__/designers';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getDesigners.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('designers client', () => {
  const expectedConfig = undefined;
  const query = mockQuery;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getDesigners()', () => {
    it('should handle a client request successfully', async () => {
      const response = mockResponse.result;

      fixtures.success({
        response,
        query,
      });

      await expect(getDesigners(query)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        join('/legacy/v1/designers', { query }),
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        query,
      });

      await expect(getDesigners(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        join('/legacy/v1/designers', { query }),
        expectedConfig,
      );
    });
  });
});
