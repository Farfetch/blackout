import { fetchGiftCardBalanceFactory } from './factories/index.js';
import { getGiftCardBalance } from '@farfetch/blackout-client';

/**
 * Fetch gift card balance.
 */
export default fetchGiftCardBalanceFactory(getGiftCardBalance);
