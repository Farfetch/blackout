import { createPersonalIdImageFactory } from './factories';
import { postUserPersonalIdImage } from '@farfetch/blackout-client/users';

/**
 * Create personal id image.
 */
export default createPersonalIdImageFactory(postUserPersonalIdImage);
