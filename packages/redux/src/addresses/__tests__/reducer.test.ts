import * as fromReducer from '../reducer';
import { LOGOUT_SUCCESS } from '../../authentication/actionTypes';
import reducer, { actionTypes } from '..';
import type { State } from '../types';

let initialState: State;
const randomAction = { type: 'this_is_a_random_action' };

describe('Addresses reducers', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('LOGOUT_SUCCESS should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.FETCH_ADDRESS_PREDICTIONS_FAILURE,
      actionTypes.FETCH_ADDRESS_PREDICTION_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { error },
        type: actionType,
      });

      expect(reducerResult.error).toBe(error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    // Loading status on REQUEST
    it.each([
      actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST,
      actionTypes.FETCH_ADDRESS_PREDICTION_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: 'foo' };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('predictions() reducer', () => {
    it.each([actionTypes.FETCH_ADDRESS_PREDICTIONS_REQUEST])(
      'should handle %s action type',
      actionType => {
        expect(reducer(undefined, { type: actionType }).predictions).toEqual({
          error: initialState.predictions.error,
          isLoading: true,
          result: null,
        });
      },
    );

    it.each([actionTypes.FETCH_ADDRESS_PREDICTIONS_FAILURE])(
      'should handle %s action type',
      actionType => {
        const error = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { error },
          type: actionType,
        }).predictions;
        const expectedResult = {
          error,
          isLoading: false,
          result: null,
        };

        expect(reducerResult).toEqual(expectedResult);
      },
    );

    it.each([actionTypes.FETCH_ADDRESS_PREDICTIONS_SUCCESS])(
      'should handle %s action type',
      actionType => {
        const payload = 'foo';
        const reducerResult = reducer(undefined, {
          payload,
          type: actionType,
        }).predictions;
        const expectedResult = {
          error: initialState.predictions.error,
          isLoading: false,
          result: payload,
        };

        expect(reducerResult).toEqual(expectedResult);
      },
    );

    it.each([actionTypes.RESET_ADDRESS_PREDICTIONS])(
      'should handle %s action type',
      actionType => {
        const reducerResult = reducer(undefined, {
          type: actionType,
        }).predictions;

        expect(reducerResult).toEqual(initialState.predictions);
      },
    );
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = null;

      expect(fromReducer.getError({ ...initialState, error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = false;

      expect(fromReducer.getIsLoading({ ...initialState, isLoading })).toBe(
        isLoading,
      );
    });
  });

  describe('getPredictions() selector', () => {
    it('should return the `predictions` property from a given state', () => {
      const predictions = { error: null, isLoading: false, result: null };

      expect(
        fromReducer.getAddressPredictions({ ...initialState, predictions }),
      ).toBe(predictions);
    });
  });

  describe('getPrediction() selector', () => {
    it('should return the `predictionDetails` property from a given state', () => {
      const prediction = { error: null, isLoading: false, result: null };

      expect(
        fromReducer.getAddressPrediction({
          ...initialState,
          prediction,
        }),
      ).toBe(prediction);
    });
  });
});
