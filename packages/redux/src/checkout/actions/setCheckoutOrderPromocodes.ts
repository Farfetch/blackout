import { putCheckoutOrderPromocodes } from '@farfetch/blackout-client';
import { setCheckoutOrderPromocodesFactory } from './factories/index.js';

/**
 * Set checkout order promocodes.
 * Important: Right now, only one promo code can be set to a checkout order.
 */
export default setCheckoutOrderPromocodesFactory(putCheckoutOrderPromocodes);
