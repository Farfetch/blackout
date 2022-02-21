import * as actionTypes from '../../actionTypes';
import * as packagesReducer from '../packages';
import reducer, { INITIAL_STATE } from '..';
import type { PackagesState, SubscriptionState } from '../../types';

const initialState: PackagesState = INITIAL_STATE.packages;
const randomAction = { type: 'this_is_a_random_action' };

describe('Subscription Packages redux reducer', () => {
  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).packages.error;

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
      const state: SubscriptionState = {
        ...INITIAL_STATE,
        packages: { ...INITIAL_STATE.packages, error: { message: 'foo' } },
      };

      expect(reducer(state, randomAction).packages.error).toBe(
        state.packages.error,
      );
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).packages.result;

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
      const state = reducer(undefined, randomAction).packages.isLoading;

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
      const state = {
        ...INITIAL_STATE,
        packages: { ...INITIAL_STATE.packages, isLoading: true },
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
          payload: { result: {} },
        }).packages.isLoading,
      ).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE} action type`, () => {
      const state = {
        ...INITIAL_STATE,
        packages: { ...INITIAL_STATE.packages, isLoading: true },
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
          payload: { error: '' },
        }).packages.isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...INITIAL_STATE,
        packages: { ...INITIAL_STATE.packages, isLoading: false },
      };

      expect(reducer(state, randomAction).packages.isLoading).toEqual(
        state.packages.isLoading,
      );
    });
  });

  describe('getPackagesIsLoading() selector', () => {
    it('should return the loading state', () => {
      const isLoading = true;

      expect(
        packagesReducer.getPackagesIsLoading({
          ...INITIAL_STATE.packages,
          isLoading,
        }),
      ).toBe(isLoading);
    });
  });

  describe('getPackages() selector', () => {
    it('should return the result state', () => {
      const result = {
        supportedChannels: ['some_channel'],
        packages: ['some_package'],
      };

      expect(
        packagesReducer.getPackages({ ...INITIAL_STATE.packages, result }),
      ).toBe(result);
    });
  });
});
