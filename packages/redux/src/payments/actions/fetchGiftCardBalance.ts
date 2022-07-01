import { fetchGiftCardBalanceFactory } from './factories';
import { getGiftCardBalance } from '@farfetch/blackout-client';

/**
 * Fetch gift card balance.
 */
export default fetchGiftCardBalanceFactory(getGiftCardBalance);
