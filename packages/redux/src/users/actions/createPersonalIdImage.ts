import { createPersonalIdImageFactory } from './factories';
import { postPersonalIdImage } from '@farfetch/blackout-client/users';

/**
 * Create personal id image.
 */
export default createPersonalIdImageFactory(postPersonalIdImage);
