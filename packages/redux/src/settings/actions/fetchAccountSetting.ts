import { fetchAccountSettingFactory } from './factories/index.js';
import { getAccountSetting } from '@farfetch/blackout-client';

/**
 * Fetches account setting.
 */
export default fetchAccountSettingFactory(getAccountSetting);
