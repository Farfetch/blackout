import * as fromPromotionEvaluations from '../reducer.js';
import * as selectors from '../selectors.js';
import {
  mockErrorState,
  mockLoadingState,
  mockPromotionEvaluationId,
  mockPromotionEvaluationItemId,
  mockPromotionEvaluationsItemsResponse,
  mockState,
} from 'tests/__fixtures__/promotionEvaluations/index.mjs';

describe('promotionEvaluations redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('arePromotionEvaluationItemsLoading()', () => {
    it('should get the promotion evaluations items loading status', () => {
      const spy = jest.spyOn(fromPromotionEvaluations, 'getIsLoading');

      expect(
        selectors.arePromotionEvaluationItemsLoading(mockLoadingState),
      ).toBe(mockLoadingState.promotionEvaluations.isLoading);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPromotionEvaluationsItemsError()', () => {
    it('should get the promotion evaluations items error', () => {
      const expectedResult = mockErrorState.promotionEvaluations.error;
      const spy = jest.spyOn(fromPromotionEvaluations, 'getError');

      expect(
        selectors.getPromotionEvaluationItemsError(mockErrorState),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPromotionEvaluationItems()', () => {
    it('should return an array with the result stored', () => {
      const result = selectors.getPromotionEvaluationItems(mockState);

      expect(result).toEqual(mockPromotionEvaluationsItemsResponse);
    });
  });

  describe('getPromotionEvaluationItemById()', () => {
    it('should return an object with the promotion evaluation item id', () => {
      const result = selectors.getPromotionEvaluationItemById(
        mockState,
        mockPromotionEvaluationItemId,
      );

      expect(result).toEqual(mockPromotionEvaluationsItemsResponse[0]);
    });
  });

  describe('getPromotionEvaluationId()', () => {
    it('should return a string with the promotion evaluation id', () => {
      const result = selectors.getPromotionEvaluationId(mockState);

      expect(result).toEqual(mockPromotionEvaluationId);
    });
  });
});
