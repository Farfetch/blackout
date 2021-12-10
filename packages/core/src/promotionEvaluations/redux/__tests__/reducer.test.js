import * as fromReducer from '../reducer';
import {
  mockPromotionEvaluationId,
  mockPromotionEvaluationsItemsResponse,
} from 'tests/__fixtures__/promotionEvaluations';
import reducer, { actionTypes } from '../';

let initialState;

describe('promotionEvaluations redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toEqual(initialState.error);
      expect(state).toEqual(null);
    });

    it('should handle FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
          meta: { promotionEvaluationId: mockPromotionEvaluationId },
        }).error,
      ).toBeNull();
    });

    it('should handle FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
          payload: {
            error: expectedResult,
          },
          meta: { promotionEvaluationId: mockPromotionEvaluationId },
        }).error,
      ).toEqual(expectedResult);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toEqual(false);
    });

    it('should handle FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_REQUEST,
          meta: { promotionEvaluationId: mockPromotionEvaluationId },
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
          payload: {
            result: {},
          },
          meta: { promotionEvaluationId: mockPromotionEvaluationId },
        }).isLoading,
      ).toEqual(false);
    });

    it('should handle FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_FAILURE,
          payload: {
            error: {},
          },
          meta: { promotionEvaluationId: mockPromotionEvaluationId },
        }).isLoading,
      ).toEqual(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: false };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer();

      expect(state.result).toEqual(initialState.result);
    });

    it('should handle FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS', () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
        payload: { result: mockPromotionEvaluationsItemsResponse },
        meta: { promotionEvaluationId: mockPromotionEvaluationId },
      });

      expect(state.result).toEqual(mockPromotionEvaluationsItemsResponse);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        result: { foo: 'bar' },
      };

      expect(reducer(state).result).toEqual(state.result);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer();

      expect(state.id).toEqual(initialState.id);
    });

    it('should handle FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS', () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_PROMOTION_EVALUATION_ITEMS_SUCCESS,
        payload: { result: mockPromotionEvaluationsItemsResponse },
        meta: { promotionEvaluationId: mockPromotionEvaluationId },
      });

      expect(state.id).toEqual(mockPromotionEvaluationId);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        id: 'bar',
      };

      expect(reducer(state).id).toEqual(state.id);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;

      expect(fromReducer.getIsLoading({ isLoading })).toEqual(isLoading);
    });
  });

  describe('getResult() selector', () => {
    it('should return the result property from a given state', () => {
      const result = { foo: 'bar' };

      expect(fromReducer.getResult({ result })).toEqual(result);
    });
  });

  describe('getId() selector', () => {
    it('should return the id property from a given state', () => {
      const id = 'bar';

      expect(fromReducer.getId({ id })).toEqual(id);
    });
  });
});
