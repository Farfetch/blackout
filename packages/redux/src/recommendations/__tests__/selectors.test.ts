import * as fromRecommendations from '../reducer';
import * as selectors from '../selectors';
import { merge } from 'lodash';
import {
  mockRecommendationsStrategy,
  mockState,
} from 'tests/__fixtures__/recommendations';

describe('Recommendations redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('isProductRecommendationLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(
        fromRecommendations,
        'getAreRecommendationsLoading',
      );

      expect(
        selectors.isProductRecommendationLoading(
          merge(mockState, {
            recommendations: {
              isLoading: {
                [mockRecommendationsStrategy]: false,
              },
            },
          }),
          mockRecommendationsStrategy,
        ),
      ).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductRecommendationsError()', () => {
    it('should get the error status', () => {
      const spy = jest.spyOn(fromRecommendations, 'getRecommendationsError');

      expect(
        selectors.getProductRecommendationsError(
          mockState,
          mockRecommendationsStrategy,
        ),
      ).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductRecommendations()', () => {
    it('should get the result', () => {
      const spy = jest.spyOn(fromRecommendations, 'getRecommendations');

      expect(selectors.getProductRecommendations(mockState)).toEqual(
        mockState.recommendations.result,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductRecommendationsByStrategyName()', () => {
    it('should get the result by strategy name', () => {
      const spy = jest.spyOn(fromRecommendations, 'getRecommendations');

      expect(
        selectors.getProductRecommendationsByStrategyName(
          mockState,
          mockRecommendationsStrategy,
        ),
      ).toEqual(mockState.recommendations.result[mockRecommendationsStrategy]);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductRecommendationsId()', () => {
    it('should get the id of the strategy', () => {
      const spy = jest.spyOn(fromRecommendations, 'getRecommendations');

      expect(
        selectors.getProductRecommendationsId(
          mockState,
          mockRecommendationsStrategy,
        ),
      ).toEqual(
        mockState.recommendations.result[mockRecommendationsStrategy].id,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
