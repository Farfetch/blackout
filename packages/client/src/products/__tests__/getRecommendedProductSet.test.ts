import { getRecommendedProductSet } from '../index.js';
import {
  mockRecommendedProductSet,
  mockRecommendedProductSetId,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getRecommendedProductSet.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('recommended product set client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getRecommendedProductSet()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockRecommendedProductSet));

      await expect(
        getRecommendedProductSet(mockRecommendedProductSetId),
      ).resolves.toEqual(mockRecommendedProductSet);
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/recommendedsets/${mockRecommendedProductSetId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getRecommendedProductSet(mockRecommendedProductSetId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/recommendedsets/${mockRecommendedProductSetId}`,
        expectedConfig,
      );
    });
  });
});
