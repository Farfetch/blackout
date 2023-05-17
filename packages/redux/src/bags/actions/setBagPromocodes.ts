import { putBagPromocodes } from '@farfetch/blackout-client';
import { setBagPromocodesFactory } from './factories/index.js';

/**
 * Sets the list of promocodes to be applied to the bag.
 */
export default setBagPromocodesFactory(putBagPromocodes);
