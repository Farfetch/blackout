import { getProductRecommendedSet } from '../index.js';
import {
  mockRecommendedSet,
  mockRecommendedSetId,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductRecommendedSet.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('recommended sets client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getProductRecommendedSet()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockRecommendedSet));

      await expect(
        getProductRecommendedSet(mockRecommendedSetId),
      ).resolves.toEqual(mockRecommendedSet);
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/recommendedsets/${mockRecommendedSetId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getProductRecommendedSet(mockRecommendedSetId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/recommendedsets/${mockRecommendedSetId}`,
        expectedConfig,
      );
    });
  });
});
