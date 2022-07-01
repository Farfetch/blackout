import * as actionTypes from '../actionTypes';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { INITIAL_STATE } from '../reducer';

describe('reducer', () => {
  it.each([actionTypes.FETCH_USER_TITLES_REQUEST])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: false,
        error: null,
      };
      const newState = reducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({ isLoading: true, error: INITIAL_STATE.error });
    },
  );

  it.each([actionTypes.FETCH_USER_TITLES_FAILURE])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };

      const dummyError = toBlackoutError(new Error('error'));

      const newState = reducer(previousState, {
        payload: { error: dummyError },
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: INITIAL_STATE.isLoading,
        error: dummyError,
      });
    },
  );

  it.each([actionTypes.FETCH_USER_TITLES_SUCCESS])(
    'should handle %s correctly',
    actionType => {
      const previousState = {
        isLoading: true,
        error: null,
      };
      const newState = reducer(previousState, {
        type: actionType,
      });

      expect(newState).toEqual({
        isLoading: false,
        error: INITIAL_STATE.error,
      });
    },
  );
});
