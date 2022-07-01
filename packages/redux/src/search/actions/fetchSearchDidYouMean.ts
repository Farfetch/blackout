import { fetchSearchDidYouMeanFactory } from './factories';
import { getSearchDidYouMean } from '@farfetch/blackout-client';

/**
 * Fetches the facets available to a given search.
 */
export default fetchSearchDidYouMeanFactory(getSearchDidYouMean);
