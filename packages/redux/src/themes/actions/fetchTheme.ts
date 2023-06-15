import { fetchThemeFactory } from './factories/index.js';
import { getTheme } from '@farfetch/blackout-client';

/**
 * Fetch styleguide theme.
 *
 * @param getTheme - Fetch styleguide theme client.
 *
 * @returns Thunk factory.
 */
export default fetchThemeFactory(getTheme);
