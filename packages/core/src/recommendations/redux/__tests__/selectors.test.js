import * as fromRecommendations from '../reducer';
import * as selectors from '../selectors';

describe('Recommendations redux selectors', () => {
  const strategyName = 'a_strategy_name';
  const mockState = {
    recommendations: {
      isLoading: {
        [strategyName]: false,
      },
      error: {
        [strategyName]: undefined,
      },
      result: {
        [strategyName]: {
          id: '0000-00000-0000-000',
          values: [
            {
              id: 12312312,
              score: 0.94,
            },
          ],
        },
      },
    },
  };

  beforeEach(jest.clearAllMocks);

  describe('isProductRecommendationLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(
        fromRecommendations,
        'getAreRecommendationsLoading',
      );

      expect(
        selectors.isProductRecommendationLoading(mockState, strategyName),
      ).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductRecommendationsError()', () => {
    it('should get the error status', () => {
      const spy = jest.spyOn(fromRecommendations, 'getRecommendationsError');

      expect(
        selectors.getProductRecommendationsError(mockState, strategyName),
      ).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductRecommendations()', () => {
    it('should get the result', () => {
      const expectedResult = {
        [strategyName]: {
          id: '0000-00000-0000-000',
          values: [
            {
              id: 12312312,
              score: 0.94,
            },
          ],
        },
      };
      const spy = jest.spyOn(fromRecommendations, 'getRecommendations');

      expect(selectors.getProductRecommendations(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductRecommendationsByStrategyName()', () => {
    it('should get the result by strategy name', () => {
      const expectedResult = {
        [strategyName]: {
          id: '0000-00000-0000-000',
          values: [
            {
              id: 12312312,
              score: 0.94,
            },
          ],
        },
      };
      const spy = jest.spyOn(fromRecommendations, 'getRecommendations');

      expect(
        selectors.getProductRecommendationsByStrategyName(
          mockState,
          strategyName,
        ),
      ).toEqual(expectedResult[strategyName]);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductRecommendationsId()', () => {
    it('should get the id of the strategy', () => {
      const recommendationId = '0000-00000-0000-000';
      const expectedResult = {
        [strategyName]: {
          id: recommendationId,
          values: [
            {
              id: 12312312,
              score: 0.94,
            },
          ],
        },
      };
      const spy = jest.spyOn(fromRecommendations, 'getRecommendations');

      expect(
        selectors.getProductRecommendationsId(mockState, strategyName),
      ).toEqual(expectedResult[strategyName].id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
