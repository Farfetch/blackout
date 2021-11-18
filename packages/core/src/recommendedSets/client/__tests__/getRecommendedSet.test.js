// @TODO: remove this file in the next version
import { getRecommendedSet } from '..';
import { getSet } from '../../../products/client';

jest.mock('../../../products/client', () => ({
  getSet: jest.fn(),
}));

describe('recommended sets client', () => {
  describe('getRecommendedSet', () => {
    it('should redirect request to the getSet client successfully', () => {
      const recommendedSetId = '1234';
      const query = {
        foo: 'foo',
      };
      const expectedConfig = undefined;

      getRecommendedSet(recommendedSetId, query, expectedConfig);

      expect(getSet).toHaveBeenCalledWith(
        recommendedSetId,
        query,
        expectedConfig,
      );
    });
  });
});
