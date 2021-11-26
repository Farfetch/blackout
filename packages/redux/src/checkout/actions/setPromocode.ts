import { putPromocode } from '@farfetch/blackout-client/checkout';
import { setPromocodeFactory } from './factories';

/**
 * Set promocode.
 *
 * @memberof module:checkout/actions
 *
 * @name setPromocode
 *
 * @returns {SetPromocodeThunkFactory}
 */
export default setPromocodeFactory(putPromocode);
