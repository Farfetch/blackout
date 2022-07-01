import { fetchSizeGuidesFactory } from './factories';
import { getSizeGuides } from '@farfetch/blackout-client';

/**
 * Fetches size guides for a given set of brand ids and category ids. This size
 * guides logic should be used in cases that the project does not have a specific
 * category tree. If your project has a category tree you should use the respective
 * logic from `@farfetch/blackout-redux/products`.
 */
export default fetchSizeGuidesFactory(getSizeGuides);
