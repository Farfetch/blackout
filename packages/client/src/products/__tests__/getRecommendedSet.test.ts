import { getRecommendedSet } from '../';
import {
  mockRecommendedSet,
  mockRecommendedSetId,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getRecommendedSet.fixtures';
import moxios from 'moxios';

describe('recommended sets client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getRecommendedSet()', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockRecommendedSet;

      fixtures.success({
        id: mockRecommendedSetId,
        response,
      });

      await expect(getRecommendedSet(mockRecommendedSetId)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        `/commerce/v1/recommendedsets/${mockRecommendedSetId}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        id: mockRecommendedSetId,
      });

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
