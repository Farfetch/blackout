import { fetchDesignersFactory } from './factories';
import { getDesigners } from '@farfetch/blackout-client/designers';

/**
 * Fetches designers grouped by first letter.
 */

export default fetchDesignersFactory(getDesigners);
