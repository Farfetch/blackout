import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetTheme,
  type QueryTheme,
  type Theme,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Fetch styleguide themes.
 *
 * @param getThemes - Fetch styleguide themes client.
 *
 * @returns Thunk factory.
 */
const fetchThemeFactory =
  (getTheme: GetTheme) =>
  (code: string, query?: QueryTheme, config?: Config) =>
  async (dispatch: Dispatch): Promise<Theme> => {
    try {
      dispatch({
        type: actionTypes.FETCH_THEME_REQUEST,
        meta: { code },
      });

      const result = await getTheme(code, query, config);

      dispatch({
        type: actionTypes.FETCH_THEME_SUCCESS,
        payload: { result },
        meta: { code },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_THEME_FAILURE,
        meta: { code },
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchThemeFactory;
