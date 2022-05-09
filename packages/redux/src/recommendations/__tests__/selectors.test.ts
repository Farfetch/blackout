import * as fromRecommendations from '../reducer';
import * as selectors from '../selectors';
import { merge } from 'lodash';
import {
  mockRecommendationsStrategy,
  mockState,
} from 'tests/__fixtures__/recommendations';
import type { StoreState } from '@farfetch/blackout-redux/types';

const mockStore = merge({} as StoreState, mockState);

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
          merge(mockStore, {
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
          mockStore,
          mockRecommendationsStrategy,
        ),
      ).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductRecommendations()', () => {
    it('should get the result', () => {
      const spy = jest.spyOn(fromRecommendations, 'getRecommendations');

      expect(selectors.getProductRecommendations(mockStore)).toEqual(
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
          mockStore,
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
          mockStore,
          mockRecommendationsStrategy,
        ),
      ).toEqual(
        mockState.recommendations.result[mockRecommendationsStrategy].id,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
