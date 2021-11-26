import * as actionTypes from '../../actionTypes';
import * as packagesReducer from '../packages';
import reducer, { INITIAL_STATE } from '..';

const initialState = INITIAL_STATE.packages;

describe('Subscription Packages redux reducer', () => {
  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().packages.error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE} action type`, () => {
      const expectedResult = 'This is an error';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
          payload: { error: expectedResult },
        }).packages.error,
      ).toBe(expectedResult);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST} action type`, () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
          payload: {},
        }).packages.error,
      ).toBe(initialState.error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { packages: { error: 'foo' } };

      expect(reducer(state).packages.error).toBe(state.packages.error);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().packages.result;

      expect(state).toBe(initialState.result);
      expect(state).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS} action type`, () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
          payload: { result: {} },
        }).packages.result,
      ).toEqual({});
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().packages.isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST} action type`, () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
          payload: {},
        }).packages.isLoading,
      ).toEqual(true);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS} action type`, () => {
      const state = { packages: { isLoading: true } };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
          payload: { result: {} },
        }).packages.isLoading,
      ).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE} action type`, () => {
      const state = { packages: { isLoading: true } };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
          payload: { error: '' },
        }).packages.isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { packages: { isLoading: false } };

      expect(reducer(state).packages.isLoading).toEqual(
        state.packages.isLoading,
      );
    });
  });

  describe('getPackagesIsLoading() selector', () => {
    it('should return the loading state', () => {
      const isLoading = true;

      expect(packagesReducer.getPackagesIsLoading({ isLoading })).toBe(
        isLoading,
      );
    });
  });

  describe('getPackages() selector', () => {
    it('should return the result state', () => {
      const result = { data: 'Some data' };

      expect(packagesReducer.getPackages({ result })).toBe(result);
    });
  });
});
