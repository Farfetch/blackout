import { createExchangeFactory } from './factories/index.js';
import { postExchange } from '@farfetch/blackout-client';

/**
 * Create exchange.
 */
export default createExchangeFactory(postExchange);
