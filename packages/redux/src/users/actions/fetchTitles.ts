import { fetchTitlesFactory } from './factories';
import { getTitles } from '@farfetch/blackout-client/users';

/**
 * Fetch a list of titles.
 *
 * @memberof module:users/actions
 *
 * @function fetchTitles
 *
 * @type {FetchTitlesThunkFactory}
 */
export default fetchTitlesFactory(getTitles);
