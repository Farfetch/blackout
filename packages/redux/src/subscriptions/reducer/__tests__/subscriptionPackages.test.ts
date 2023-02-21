import * as actionTypes from '../../actionTypes';
import reducer, { INITIAL_STATE } from '../subscriptionPackages';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { SubscriptionsState } from '../../types';

const hash = 'id=Newsletter';
const randomAction = { type: 'this_is_a_random_action' };

describe('subscriptionPackages reducer', () => {
  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBeUndefined();
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE} action type`, () => {
      const expectedResult = 'This is an error';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
          payload: { error: expectedResult },
          meta: { hash },
        })[hash]?.error,
      ).toBe(expectedResult);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST} action type`, () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
          payload: {},
          meta: { hash },
        })[hash]?.error,
      ).toBeNull();
    });

    it('should handle other actions by returning the previous state', () => {
      const state: SubscriptionsState['packages'] = {
        ...INITIAL_STATE,
        Newsletter: {
          isLoading: false,
          error: new Error('foo') as BlackoutError,
          result: null,
        },
      };

      expect(reducer(state, randomAction)['Newsletter']!.error).toBe(
        state['Newsletter']!.error,
      );
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction)[hash]?.result;

      expect(state).toBeUndefined();
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS} action type`, () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
          payload: { result: {} },
          meta: { hash },
        })[hash]?.result,
      ).toMatchObject({});
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction)[hash]?.isLoading;

      expect(state).toBeUndefined();
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST} action type`, () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST,
          payload: {},
          meta: { hash },
        })[hash]?.isLoading,
      ).toBe(true);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS} action type`, () => {
      const state: SubscriptionsState['packages'] = {
        [hash]: {
          isLoading: true,
          error: null,
          result: null,
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS,
          payload: { result: {} },
          meta: { hash },
        })[hash]?.isLoading,
      ).toBe(false);
    });

    it(`should handle ${actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE} action type`, () => {
      const state: SubscriptionsState['packages'] = {
        [hash]: {
          isLoading: true,
          error: null,
          result: null,
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE,
          payload: { error: '' },
          meta: { hash },
        })[hash]?.isLoading,
      ).toBe(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state: SubscriptionsState['packages'] = {
        [hash]: {
          isLoading: true,
          error: null,
          result: null,
        },
      };

      expect(reducer(state, randomAction)[hash]?.isLoading).toEqual(
        state[hash]?.isLoading,
      );
    });
  });
});
