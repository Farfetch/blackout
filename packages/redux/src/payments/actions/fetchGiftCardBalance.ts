import { fetchGiftCardBalanceFactory } from './factories';
import { postCheckGiftCardBalance } from '@farfetch/blackout-client/payments';

/**
 * Fetch gift card balance.
 *
 * @memberof module:payments/actions
 *
 * @name fetchGiftCardBalance
 *
 * @type {FetchGiftCardBalanceThunkFactory}
 */
export default fetchGiftCardBalanceFactory(postCheckGiftCardBalance);
