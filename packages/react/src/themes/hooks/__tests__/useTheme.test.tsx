import { cleanup, renderHook } from '@testing-library/react';
import { fetchTheme } from '@farfetch/blackout-redux';
import {
  mockInitialState,
  mockState,
  mockTheme,
  mockThemeCode,
} from 'tests/__fixtures__/themes/index.mjs';
import { withStore } from '../../../../tests/helpers/index.js';
import useTheme from '../useTheme.js';
import type { BlackoutError } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchTheme: jest.fn(() => () => Promise.resolve()),
}));

describe('useThemes', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const { result } = renderHook(
      () =>
        useTheme({
          code: mockThemeCode,
        }),
      {
        wrapper: withStore(mockState),
      },
    );

    const { isLoading, error, isFetched, data } = result.current;
    const { theme: themeResult } = data!;

    expect(isLoading).toBeFalsy();
    expect(error).toBeUndefined();
    expect(isFetched).toBeTruthy();
    expect(themeResult).toMatchObject(mockTheme);
  });

  it('should return in loading state', () => {
    const { result } = renderHook(
      () =>
        useTheme({
          code: mockThemeCode,
        }),
      {
        wrapper: withStore({
          ...mockState,
          themes: {
            ...mockState.themes,
            isLoading: {
              [mockThemeCode]: true,
            },
          },
        }),
      },
    );

    const { isLoading, error, isFetched } = result.current;

    expect(isLoading).toBeTruthy();
    expect(error).toBeUndefined();
    expect(isFetched).toBeFalsy();
  });

  it('should return in error state', () => {
    const { result } = renderHook(
      () =>
        useTheme({
          code: mockThemeCode,
        }),
      {
        wrapper: withStore({
          ...mockState,
          themes: {
            ...mockState.themes,
            error: {
              [mockThemeCode]: new Error('error') as BlackoutError,
            },
          },
        }),
      },
    );

    const { error, isFetched } = result.current;

    expect(error).toBeTruthy();
    expect(isFetched).toBeTruthy();
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      renderHook(
        () =>
          useTheme({
            code: mockThemeCode,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchTheme).toHaveBeenCalledWith(mockThemeCode, {}, undefined);
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      renderHook(
        () =>
          useTheme({
            code: mockThemeCode,
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchTheme).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', async () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(
        () =>
          useTheme({
            code: mockThemeCode,
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockState),
        },
      );

      await fetch();

      expect(fetchTheme).toHaveBeenCalledWith(mockThemeCode, {}, undefined);
    });
  });
});
