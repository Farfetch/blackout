import { fetchSearchDidYouMeanFactory } from './factories';
import { getSearchDidYouMean } from '@farfetch/blackout-client/search';

/**
 * Fetches the facets available to a given search.
 */
export default fetchSearchDidYouMeanFactory(getSearchDidYouMean);
