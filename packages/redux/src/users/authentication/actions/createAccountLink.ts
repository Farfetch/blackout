import { createAccountLinkFactory } from './factories/index.js';
import { postAccountLink } from '@farfetch/blackout-client';

/**
 * Merges social provider and Farfetch accounts.
 */
export default createAccountLinkFactory(postAccountLink);
