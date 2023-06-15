import * as actionTypes from '../actionTypes.js';
import { mockTheme, mockThemeCode } from 'tests/__fixtures__/themes/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { INITIAL_STATE } from '../reducer.js';
import type { ThemeState } from '../types/index.js';

const mockAction = { type: 'foo' };
const meta = { code: mockThemeCode };
let initialState: ThemeState;

describe('themes reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockThemeCode]: error,
    };

    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).error;

      expect(state).toEqual(initialState.error);
    });

    it(`should handle ${actionTypes.FETCH_THEME_REQUEST} action type`, () => {
      const expectedError = {
        [mockThemeCode]: undefined,
      };
      const state = reducer(INITIAL_STATE, {
        type: actionTypes.FETCH_THEME_REQUEST,
        payload: {
          error,
        },
        meta,
      });

      expect(state.error).toEqual(expectedError);
    });

    it(`should handle ${actionTypes.FETCH_THEME_FAILURE} action type`, () => {
      const state = reducer(INITIAL_STATE, {
        type: actionTypes.FETCH_THEME_FAILURE,
        payload: {
          error,
        },
        meta,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { [mockThemeCode]: toBlackoutError(new Error('error')) },
        isLoading: {},
        result: {},
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_THEME_REQUEST} action type`, () => {
      const expectedIsLoading = {
        [mockThemeCode]: true,
      };
      const state = reducer(INITIAL_STATE, {
        type: actionTypes.FETCH_THEME_REQUEST,
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_THEME_SUCCESS} action type`, () => {
      const expectedIsLoading = {
        [mockThemeCode]: false,
      };
      const state = reducer(INITIAL_STATE, {
        type: actionTypes.FETCH_THEME_SUCCESS,
        payload: { result: mockTheme },
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_THEME_FAILURE} action type`, () => {
      const expectedIsLoading = {
        [mockThemeCode]: false,
      };
      const state = reducer(INITIAL_STATE, {
        type: actionTypes.FETCH_THEME_FAILURE,
        payload: {
          error: new Error('this is an error'),
        },
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: { [mockThemeCode]: false },
        result: {},
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    const payload = { result: mockTheme };
    const expectedResult = {
      [mockThemeCode]: mockTheme,
    };

    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).result;

      expect(state).toEqual(initialState.result);
    });

    it(`should handle ${actionTypes.FETCH_THEME_SUCCESS} action type`, () => {
      const state = reducer(INITIAL_STATE, {
        type: actionTypes.FETCH_THEME_SUCCESS,
        payload,
        meta,
      });

      expect(state.result).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: {},
        result: { [mockThemeCode]: mockTheme },
      };

      expect(reducer(state, mockAction).result).toEqual(state.result);
    });
  });
});
