import { createExchangeBookRequestFactory } from './factories/index.js';
import { postExchangeBookRequest } from '@farfetch/blackout-client';

/**
 * Create an exchange book request.
 */
export default createExchangeBookRequestFactory(postExchangeBookRequest);
