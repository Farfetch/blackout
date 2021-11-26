import { getBrands } from '../';
import { mockBrandsResponse, mockQuery } from 'tests/__fixtures__/brands';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getBrands.fixtures';
import moxios from 'moxios';

describe('brands client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getBrands()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockBrandsResponse;

      fixtures.success({
        query: mockQuery,
        response,
      });

      await expect(getBrands(mockQuery)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/brands?id=211376%2C%20110127',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        query: mockQuery,
      });

      await expect(getBrands(mockQuery)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/brands?id=211376%2C%20110127',
        expectedConfig,
      );
    });
  });
});
