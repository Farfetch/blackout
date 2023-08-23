import { deleteCheckoutOrderPromocodes } from '@farfetch/blackout-client';
import { removeCheckoutOrderPromocodesFactory } from './factories/index.js';

/**
 * Remove checkout order promocodes.
 * This will remove the prop `promocode` from the checkout order
 * Not applied for `promocodes`
 */
export default removeCheckoutOrderPromocodesFactory(
  deleteCheckoutOrderPromocodes,
);
