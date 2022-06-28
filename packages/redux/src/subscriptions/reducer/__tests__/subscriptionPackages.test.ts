import * as actionTypes from '../../actionTypes';
import reducer, {
  getSubscriptionPackages,
  getSubscriptionPackagesIsLoading,
  INITIAL_STATE,
} from '../subscriptionPackages';
import type { SubscriptionsState } from '../../types';

const initialState: SubscriptionsState['packages'] = INITIAL_STATE;
const randomAction = { type: 'this_is_a_random_action' };

describe('Subscription Packages redux reducer', () => {
  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE} action type`, () => {
      const expectedResult = 'This is an error';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
          payload: { error: expectedResult },
        }).error,
      ).toBe(expectedResult);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST} action type`, () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
          payload: {},
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state: SubscriptionsState['packages'] = {
        ...INITIAL_STATE,
        error: { message: 'foo', name: 'error', code: -1 },
      };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toBe(initialState.result);
      expect(state).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS} action type`, () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
          payload: { result: {} },
        }).result,
      ).toEqual({});
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST} action type`, () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
          payload: {},
        }).isLoading,
      ).toEqual(true);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS} action type`, () => {
      const state: SubscriptionsState['packages'] = {
        ...INITIAL_STATE,
        isLoading: true,
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
          payload: { result: {} },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE} action type`, () => {
      const state: SubscriptionsState['packages'] = {
        ...INITIAL_STATE,
        isLoading: true,
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
          payload: { error: '' },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state: SubscriptionsState['packages'] = {
        ...INITIAL_STATE,
        isLoading: false,
      };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('getSubscriptionPackagesIsLoading() selector', () => {
    it('should return the loading state', () => {
      const isLoading = true;

      expect(
        getSubscriptionPackagesIsLoading({
          ...INITIAL_STATE,
          isLoading,
        }),
      ).toBe(isLoading);
    });
  });

  describe('getSubscriptionPackages() selector', () => {
    it('should return the result state', () => {
      const result = {
        supportedChannels: ['some_channel'],
        packages: ['some_package'],
      };

      expect(getSubscriptionPackages({ ...INITIAL_STATE, result })).toBe(
        result,
      );
    });
  });
});
