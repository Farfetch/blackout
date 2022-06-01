import { fetchIntentFactory } from './factories';
import { getIntent } from '@farfetch/blackout-client/payments';

/**
 * Fetch intent.
 */
export default fetchIntentFactory(getIntent);
