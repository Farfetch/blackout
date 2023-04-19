import { createUserAttributeFactory } from './factories/index.js';
import { postUserAttribute } from '@farfetch/blackout-client';

/**
 * Create user attribute for user with given id.
 */
export default createUserAttributeFactory(postUserAttribute);
