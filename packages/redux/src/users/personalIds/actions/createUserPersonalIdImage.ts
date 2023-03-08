import { createUserPersonalIdImageFactory } from './factories/index.js';
import { postUserPersonalIdImage } from '@farfetch/blackout-client';

/**
 * Create personal id image.
 */
export default createUserPersonalIdImageFactory(postUserPersonalIdImage);
