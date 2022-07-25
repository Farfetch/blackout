import { createUserPersonalIdImageFactory } from './factories';
import { postUserPersonalIdImage } from '@farfetch/blackout-client';

/**
 * Create personal id image.
 */
export default createUserPersonalIdImageFactory(postUserPersonalIdImage);
