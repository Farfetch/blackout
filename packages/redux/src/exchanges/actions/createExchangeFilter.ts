import { createExchangeFilterFactory } from './factories/index.js';
import { postExchangeFilter } from '@farfetch/blackout-client';

/**
 * Create exchange filter.
 */
export default createExchangeFilterFactory(postExchangeFilter);
