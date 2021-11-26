import { getBrand } from '../';
import { mockBrandId, mockBrandResponse } from 'tests/__fixtures__/brands';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getBrand.fixtures';
import moxios from 'moxios';

describe('brands client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getBrand()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockBrandResponse;

      fixtures.success({
        id: mockBrandId,
        response,
      });

      await expect(getBrand(mockBrandId)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/brands/${mockBrandId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        id: mockBrandId,
      });

      await expect(getBrand(mockBrandId)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/brands/${mockBrandId}`,
        expectedConfig,
      );
    });
  });
});
