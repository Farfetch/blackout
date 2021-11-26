import { fetchSearchIntentsFactory } from './factories';
import { getSearchIntents } from '@farfetch/blackout-client/search';

/**
 * Fetches the search intents for the given query with search terms. With these
 * results is possible to know the next action to perform - redirect to a pdp,
 * plp or another `redirectUrl`.
 *
 * @memberof module:search/actions
 *
 * @name fetchSearchIntents
 *
 * @type {FetchSearchIntentsThunkFactory}
 */
export default fetchSearchIntentsFactory(getSearchIntents);
