import { fetchIntentFactory } from './factories';
import { getIntent } from '@farfetch/blackout-client/payments';

/**
 * Fetch intent.
 *
 * @memberof module:payments/actions
 *
 * @name fetchIntent
 *
 * @type {FetchIntentThunkFactory}
 */
export default fetchIntentFactory(getIntent);
