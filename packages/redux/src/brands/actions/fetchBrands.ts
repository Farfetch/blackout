import { fetchBrandsFactory } from './factories';
import { getBrands } from '@farfetch/blackout-client/brands';

/**
 * Fetches a brands with the given params.
 *
 * @memberof module:brands/actions
 *
 * @function fetchBrands
 *
 * @type {FetchBrandsThunkFactory}
 */

export default fetchBrandsFactory(getBrands);
