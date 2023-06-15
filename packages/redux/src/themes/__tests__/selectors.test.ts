import * as fromReducer from '../reducer.js';
import * as selectors from '../selectors.js';
import {
  mockState,
  mockTheme,
  mockThemeCode,
} from 'tests/__fixtures__/themes/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';

describe('Themes selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('isThemeLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.isThemeLoading(mockState, mockThemeCode)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getThemeError()', () => {
    it('should get the error status', () => {
      const spy = jest.spyOn(fromReducer, 'getError');

      expect(selectors.getThemeError(mockState, mockThemeCode)).toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTheme()', () => {
    it('should get the result', () => {
      const spy = jest.spyOn(fromReducer, 'getResult');

      expect(selectors.getTheme(mockState, mockThemeCode)).toEqual(mockTheme);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isThemeFetched()', () => {
    it('should return true if the theme is fetched and it is not loading', () => {
      const mockInitialState = {
        ...mockState,
        themes: {
          ...mockState.themes,
          isLoading: {},
          error: {},
        },
      };

      expect(selectors.isThemeFetched(mockInitialState, mockThemeCode)).toBe(
        true,
      );
    });

    it('should return true if there is an error and it is not loading', () => {
      const mockStateWithBagItemError = {
        ...mockState,
        themes: {
          ...mockState.themes,
          isLoading: {
            [mockThemeCode]: false,
          },
          error: {
            [mockThemeCode]: toBlackoutError(new Error('error: not loaded')),
          },
        },
      };

      expect(
        selectors.isThemeFetched(mockStateWithBagItemError, mockThemeCode),
      ).toBe(true);
    });

    it('should return false if it is loading', () => {
      const mockStateWithBagItemLoading = {
        ...mockState,
        themes: {
          ...mockState.themes,
          isLoading: {
            [mockThemeCode]: true,
          },
          error: {},
        },
      };

      expect(
        selectors.isThemeFetched(mockStateWithBagItemLoading, mockThemeCode),
      ).toBe(false);
    });
  });
});
