// @TODO: Remove this file in version 2.0.0.
import { getInitialState } from '../../../../tests';
import { siteFeatures } from '../__fixtures__/siteFeatures.fixtures';
import reducer, { actionTypes } from '..';

let initialState;

describe('siteFeatures reducer', () => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([actionTypes.FETCH_SITE_FEATURES_REQUEST])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(
            {
              error: 'previous error',
            },
            {
              type: actionType,
            },
          ).error,
        ).toBe(initialState.error);
      },
    );

    it('should handle FETCH_SITE_FEATURES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_SITE_FEATURES_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('result() reducer', () => {
    it('should handle FETCH_SITE_FEATURES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: siteFeatures },
          type: actionTypes.FETCH_SITE_FEATURES_SUCCESS,
        }).result,
      ).toStrictEqual(siteFeatures);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { result: 'foo' };

      expect(reducer(state).result).toBe(state.result);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle FETCH_SITE_FEATURES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SITE_FEATURES_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });
});
