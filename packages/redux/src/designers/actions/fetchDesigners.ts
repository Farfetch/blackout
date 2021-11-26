import { fetchDesignersFactory } from './factories';
import { getDesigners } from '@farfetch/blackout-client/designers';

/**
 * Fetches designers grouped by first letter.
 *
 * @memberof module:designers/actions
 *
 * @function fetchDesigners
 *
 * @type {FetchDesignersThunkFactory}
 */

export default fetchDesignersFactory(getDesigners);
