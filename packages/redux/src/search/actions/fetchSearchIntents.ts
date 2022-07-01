import { fetchSearchIntentsFactory } from './factories';
import { getSearchIntents } from '@farfetch/blackout-client';

/**
 * Fetches the search intents for the given query with search terms. With these
 * results is possible to know the next action to perform - redirect to a pdp, plp
 * or another `redirectUrl`.
 */
export default fetchSearchIntentsFactory(getSearchIntents);
