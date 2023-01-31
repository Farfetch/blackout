import { getRecommendedSetWithOutOfStock } from '../';
import { mockRecommendedSet, mockSetId } from 'tests/__fixtures__/products';
import client from '../../../../helpers/client';
import fixtures from '../__fixtures__/getRecommendedSetWithOutOfStock.fixtures';
import moxios from 'moxios';

describe('recommended sets client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getRecommendedSetWithOutOfStock()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockRecommendedSet;

      fixtures.success({
        id: mockSetId,
        response,
      });

      await expect(getRecommendedSetWithOutOfStock(mockSetId)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/recommendedsets/${mockSetId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        id: mockSetId,
      });

      await expect(
        getRecommendedSetWithOutOfStock(mockSetId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/recommendedsets/${mockSetId}`,
        expectedConfig,
      );
    });
  });
});
