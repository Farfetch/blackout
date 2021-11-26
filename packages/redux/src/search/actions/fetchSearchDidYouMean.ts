import { fetchSearchDidYouMeanFactory } from './factories';
import { getSearchDidYouMean } from '@farfetch/blackout-client/search';

/**
 * Fetches the facets available to a given search.
 *
 * @memberof module:search/actions
 *
 * @name fetchSearchDidYouMean
 *
 * @type {FetchSearchDidYouMeanThunkFactory}
 */
export default fetchSearchDidYouMeanFactory(getSearchDidYouMean);
