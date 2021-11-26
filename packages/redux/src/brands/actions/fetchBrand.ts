import { fetchBrandFactory } from './factories';
import { getBrand } from '@farfetch/blackout-client/brands';

/**
 * Fetches a brand with the given id.
 *
 * @memberof module:brands/actions
 *
 * @function fetchBrand
 *
 * @type {FetchBrandThunkFactory}
 */

export default fetchBrandFactory(getBrand);
