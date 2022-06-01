import { fetchGiftCardBalanceFactory } from './factories';
import { postCheckGiftCardBalance } from '@farfetch/blackout-client/payments';

/**
 * Fetch gift card balance.
 */
export default fetchGiftCardBalanceFactory(postCheckGiftCardBalance);
