import * as actionTypes from '../actionTypes';
import {
  mockPromotionEvaluationId,
  mockPromotionEvaluationsItemsResponse,
} from 'tests/__fixtures__/promotionEvaluations';
import reducer, * as fromReducer from '../reducer';

let initialState;
const mockAction = { type: 'foo' };

describe('promotionEvaluations redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(fromReducer.INITIAL_STATE, mockAction);
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(fromReducer.INITIAL_STATE, mockAction).error;

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
      const state = reducer(fromReducer.INITIAL_STATE, mockAction).isLoading;

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
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(fromReducer.INITIAL_STATE, mockAction).result;

      expect(state).toEqual(initialState.result);
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
        ...initialState,
        result: { foo: 'bar' },
      };

      expect(reducer(state, mockAction).result).toEqual(state.result);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(fromReducer.INITIAL_STATE, mockAction).id;

      expect(state).toEqual(initialState.id);
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
        ...initialState,
        id: 'bar',
      };

      expect(reducer(state, mockAction).id).toEqual(state.id);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      expect(fromReducer.getError(initialState)).toBe(initialState.error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      expect(fromReducer.getIsLoading(initialState)).toEqual(
        initialState.isLoading,
      );
    });
  });

  describe('getResult() selector', () => {
    it('should return the result property from a given state', () => {
      expect(fromReducer.getResult(initialState)).toEqual(initialState.result);
    });
  });

  describe('getId() selector', () => {
    it('should return the id property from a given state', () => {
      expect(fromReducer.getId(initialState)).toEqual(initialState.id);
    });
  });
});
