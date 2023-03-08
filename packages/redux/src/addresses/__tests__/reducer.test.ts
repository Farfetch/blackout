import * as actionTypes from '../actionTypes.js';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../../users/authentication/actionTypes.js';
import reducer, * as fromReducer from '../reducer.js';
import type { AddressesState } from '../types/index.js';

let initialState: AddressesState;

describe('Addresses reducers', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it.each([
      actionTypes.RESET_ADDRESS_PREDICTIONS,
      LOGOUT_SUCCESS,
      LOGIN_SUCCESS,
      FETCH_USER_SUCCESS,
      REGISTER_SUCCESS,
    ])('should return initial state on %s action', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
          payload: {},
        }),
      ).toMatchObject(initialState);
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
  });

  describe('prediction() reducer', () => {
    it.each([actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_REQUEST])(
      'should handle %s action type',
      actionType => {
        expect(reducer(undefined, { type: actionType }).prediction).toEqual({
          error: initialState.prediction.error,
          isLoading: true,
          result: null,
        });
      },
    );

    it.each([actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_FAILURE])(
      'should handle %s action type',
      actionType => {
        const error = 'foo';
        const reducerResult = reducer(undefined, {
          payload: { error },
          type: actionType,
        }).prediction;
        const expectedResult = {
          error,
          isLoading: false,
          result: null,
        };

        expect(reducerResult).toEqual(expectedResult);
      },
    );

    it.each([actionTypes.FETCH_ADDRESS_PREDICTION_DETAILS_SUCCESS])(
      'should handle %s action type',
      actionType => {
        const payload = 'foo';
        const reducerResult = reducer(undefined, {
          payload,
          type: actionType,
        }).prediction;
        const expectedResult = {
          error: initialState.prediction.error,
          isLoading: false,
          result: payload,
        };

        expect(reducerResult).toEqual(expectedResult);
      },
    );
  });

  describe('getAddressPredictions() selector', () => {
    it('should return the `predictions` property from a given state', () => {
      const predictions = { error: null, isLoading: false, result: null };

      expect(
        fromReducer.getAddressPredictions({ ...initialState, predictions }),
      ).toBe(predictions);
    });
  });

  describe('getAddressPrediction() selector', () => {
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
