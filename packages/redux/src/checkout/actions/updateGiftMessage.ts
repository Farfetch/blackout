import { patchGiftMessage } from '@farfetch/blackout-client/checkout';
import { updateGiftMessageFactory } from './factories';

/**
 * Update Gift Message.
 *
 * @memberof module:checkout/actions
 *
 * @name updateGiftMessage
 *
 * @type {UpdateGiftMessageThunkFactory}
 */
export default updateGiftMessageFactory(patchGiftMessage);
