import { getRecommendedSet } from '../';
import {
  mockRecommendedSet,
  mockRecommendedSetId,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getRecommendedSet.fixtures';
import mswServer from '../../../tests/mswServer';

describe('recommended sets client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getRecommendedSet()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockRecommendedSet));

      expect.assertions(2);

      await expect(getRecommendedSet(mockRecommendedSetId)).resolves.toEqual(
        mockRecommendedSet,
      );
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/recommendedsets/${mockRecommendedSetId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        getRecommendedSet(mockRecommendedSetId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/recommendedsets/${mockRecommendedSetId}`,
        expectedConfig,
      );
    });
  });
});
