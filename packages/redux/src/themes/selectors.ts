import { getError, getIsLoading, getResult } from './reducer.js';
import type { StoreState } from '../types/index.js';
import type { Theme } from '@farfetch/blackout-client';
import type { ThemeState } from './types/index.js';

/**
 * Checks if styleguide theme has error.
 *
 * @param state - Application state.
 * @param code  - The theme identifier.
 *
 * @returns Theme error.
 */
export const getThemeError = (state: StoreState, code: Theme['code']) =>
  getError(state.themes as ThemeState)?.[code];

/**
 * Checks if styleguide theme is loading.
 *
 * @param state - Application state.
 * @param code  - The theme identifier.
 *
 * @returns If the theme is loading or not.
 */
export const isThemeLoading = (state: StoreState, code: Theme['code']) =>
  getIsLoading(state.themes as ThemeState)?.[code];

/**
 * Gets a styleguide theme.
 *
 * @param state - Application state.
 * @param code  - The theme identifier.
 *
 * @returns The styleguide theme.
 */
export const getTheme = (state: StoreState, code: Theme['code']) =>
  getResult(state.themes as ThemeState)?.[code];

/**
 * Checks if a styleguide theme is fetched.
 *
 * @param state - Application state.
 * @param code  - The theme identifier.
 *
 * @returns If the styleguide theme was requested or not.
 */
export const isThemeFetched = (state: StoreState, code: Theme['code']) =>
  (!!getTheme(state, code) || !!getThemeError(state, code)) &&
  !isThemeLoading(state, code);
